const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
