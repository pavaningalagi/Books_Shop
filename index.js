require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8081;

const { connection } = require("./config/db");
const { userRoutes } = require("./routes/userRoutes");
const { booksRoutes } = require("./routes/booksRoutes");

app.get("/", (req, res) => {
  try {
    res.status(200).send({ message: "Welcome to Book Shop!" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.use("/users", userRoutes);
// app.use("/books", booksRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connection established");
  } catch (error) {}
  console.log(`server listening on port ${PORT}`);
});
