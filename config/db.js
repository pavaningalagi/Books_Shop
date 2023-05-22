const mongoose = require("mongoose");
require("dotenv").config();
const mongoDB = process.env.mongoDB;
const connection = mongoose.connect(mongoDB);

module.exports = {
  connection,
};
