const express = require("express");
const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const userRoutes = express.Router();

// to gister the user
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userFound = await userModel.findOne({ email: email });
    const saltRounds = 10;
    if (userFound) {
      res.status(200).send({ message: "User already registered please login" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err;

        const user = new userModel({ name, email, password: hash });
        await user.save();
        if (user) {
          res.status(200).send({ message: "user registration successful" });
        } else {
          res.status(403).send({ message: "User registration failed" });
        }
      });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// to login user
userRoutes.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userRoutes.findOne({ email });
  bcrypt.compare(password, user.password, function (err, result) {
    // result == true
    if (err) throw err;
    res.send({ message: result.message });
  });
});

module.exports = {
  userRoutes,
};
