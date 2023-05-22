const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const key = process.env.key;
const fs = require("fs");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, key, function (err, decoded) {
        // console.log(decoded.foo) // bar
        if (decoded) {
          //   console.log(decoded);
          next();
        } else {
          res.status(401).send({ error: err, response: "Please Login" });
        }
      });
    } else {
      res.status(401).send({ message: "please login" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, response: "Please Login" });
  }
};

module.exports = {
  authenticate,
};
