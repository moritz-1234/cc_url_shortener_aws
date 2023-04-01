import pg from "pg";
import { createHash } from "crypto";

const dbConfig = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE,
};

const pool = new pg.Pool(dbConfig);
async function query(q, args) {
  const client = await pool.connect();
  console.log("client connected");
  let res;
  try {
    await client.query("BEGIN");
    try {
      res = await client.query(q, args);
      await client.query("COMMIT");
    } catch (err) {
      console.log(err);
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
}
async function checkIfUrlExists(short_url) {
  const sql = "select * from url where short_url = $1";
  const res = await query(sql, [short_url]);
  return res.rowCount > 0;
}
export async function handler(event, context, callback) {
  let response = {};
  const body = JSON.parse(event.body);
  const url = body.url;
  try {
    console.log("executing query");
    const hash = createHash("md5").update(url).digest("hex").slice(0, 8);
    const exists = await checkIfUrlExists(hash);
    // if the hash already exists, we don't need to insert it again
    if (!exists) {
      const sql = "insert into url (short_url, long_url) values ($1, $2)";
      const res = await query(sql, [hash, url]);
    }
    response.statusCode = 200;
    response.body = JSON.stringify({ shortUrl: hash });
    return response;
  } catch (err) {
    console.log("Database " + err);
    response.statusCode = 500;
    response.body = JSON.stringify({ error: "Database error" });
  }
  return response;
}
