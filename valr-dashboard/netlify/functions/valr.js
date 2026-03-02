const https = require("https");

exports.handler = async function (event, context) {
  return new Promise((resolve) => {
    https.get("https://api.valr.com/v1/public/marketsummary", (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
          },
          body: data,
        });
      });
    }).on("error", (err) => {
      resolve({
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: err.message }),
      });
    });
  });
};
