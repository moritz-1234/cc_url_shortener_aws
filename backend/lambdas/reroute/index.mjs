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
async function getLongUrl(short_url) {
  const res = await query("SELECT long_url FROM url WHERE short_url = $1", [
    short_url,
  ]);
  return res.rows[0]?.long_url;
}

export async function handler(event, context, callback) {
  //   return "hello world";
  let response = {};
  //   const body = JSON.parse(event.body);
  //   const url = body.url;
  try {
    console.log("executing query");
    const long_url = await getLongUrl(event.queryStringParameters?.shortUrl);
    response.statusCode = 200;
    response.body = JSON.stringify({ long_url });
    return response;
  } catch (err) {
    console.log("Database " + err);
    response.statusCode = 500;
    response.body = JSON.stringify({ error: "Database error" + err });
  }
  return response;
}
