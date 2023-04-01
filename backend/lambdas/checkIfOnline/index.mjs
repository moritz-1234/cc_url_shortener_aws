import * as https from "https";

async function doHttpRequest(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        console.log(res);
        resolve(res);
      })
      .on("error", (e) => {
        console.error(e);
        reject(e);
      });
  });
}
export async function handler(event, context, callback) {
  let response = {};
  console.log(event);
  const url = event.queryStringParameters?.url;
  if (!url) {
    response.statusCode = 400;
    response.body = JSON.stringify({ error: "No url provided" });
    return response;
  }
  try {
    await doHttpRequest(url);
    response.statusCode = 200;
    response.body = JSON.stringify({ available: true });
  } catch (error) {
    console.log(error);
    response.statusCode = 200;
    response.body = JSON.stringify({ available: false });
  }
  return response;
}
