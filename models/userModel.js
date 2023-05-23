const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please enter a valid name."] },
  email: { type: String, required: [true, "Please enter a valid email."] },
  password: {
    type: String,
    required: [true, "Please enter a valid password."],
  },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
});
userSchema.index({
  name: 1,
  email: 1,
  password: 1,
});
const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
