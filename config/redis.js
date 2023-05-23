const redis = require("redis");
const client = redis.createClient();
client.on("connect", function () {
  console.log("Connected! to redis");
});
client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = {
  client,
};
