require("dotenv").config();
const express = require("express");
const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = express.Router();

// to gister the user
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userFound = await userModel.findOne({ email: email });
    const saltRounds = 10;
    if (userFound) {
      res.status(200).send({ message: "User already registered please login" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        const user = new userModel({ name, email, password: hash, role });
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
userRoutes.post("/login", async (req, res) => {
  try {
    const key = process.env.key;
    const refreshkey = process.env.refreshkey;
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    // res.send({user:user});
    const secured_password = user.password;
    bcrypt.compare(password, secured_password, (err, result) => {
      if (result) {
        const token = jwt.sign({ user: user }, key, { expiresIn: "1d" });
        const Refresh_token = jwt.sign({ user: user }, refreshkey, {
          expiresIn: "30d",
        });
        res.status(200).send({
          msg: `Welcome back to Books Shop ${user.name}`,
          token: token,
          refresh_token: Refresh_token,
        });
      } else {
        res.status(401).send({ msg: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(401).send({ msg: "Invalid credentials" });
  }
});

userRoutes.get("/getnewtoken", (req, res) => {
  const reftoken = req.headers.authorization;
  const key = process.env.key;
  const refreshkey = process.env.refreshkey;
  if (!reftoken) {
    res.send("Please Login");
  }
  jwt.verify(reftoken, refreshkey, (err, decoded) => {
    if (err) {
      res.send({ msg: "Please Login" });
    } else {
      // console.log(decoded)
      const { userid } = decoded;
      const token = jwt.sign({ userid: userid }, key, { expiresIn: 20 });
      res.send({ msg: `New Token is Generated`, token: token });
    }
  });
});

module.exports = {
  userRoutes,
};
