const express = require("express");
const booksRoutes = express.Router();
const { booksModel } = require("../models/booksModel");

//get all books
booksRoutes.get("/", async (req, res) => {
  try {
    const books = await booksModel.find();
    if (books.length > 0) {
      //   console.log(books[0]._id);
      res.status(200).send({ message: "Books Data", data: books });
    } else {
      res.status(404).send({ message: "Books Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get book by id
booksRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await booksModel.findById(id);
    if (book) {
      res.status(200).send({ message: "Book Data", data: book });
    } else {
      res.status(404).send({ message: "Book Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// add book
booksRoutes.post("/", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const isThere = await booksModel.findOne({title});
    if (isThere) {
      res.status(200).send({
        message: "Books is already available please add another book",
      });
    } else {
      const book = new booksModel({ title, author, year });
      await book.save();
      if (book) {
        res.status(200).send({ message: "Book Added", data: book });
      } else {
        res.status(404).send({ message: "please check the data entered" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//update the book
booksRoutes.put("/:id", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const id = req.params.id;
    const book = await booksModel.findOneAndReplace(
      { _id: id },
      {
        title,
        author,
        year,
      }
    );
    await book.save();
    if (book) {
      res.status(200).send({ message: "Book data is updated", data: book });
    } else {
      res.status(404).send({ message: "please check the data entered" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//delete the book
booksRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await booksModel.findByIdAndDelete(id);
    await book.save();
    if (book) {
      res.status(200).send({ message: "Book data is deleted", data: book });
    } else {
      res.status(404).send({ message: "please check the Id" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  booksRoutes,
};
