const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: { type: String, required: [true, "Please enter a valid title."] },
  author: { type: String, required: [true, "Please enter a valid author."] },
  year: { type: Number, required: [true, "Please enter a valid year."] },
});
booksSchema.index({
  title: 1,
  author: 1,
  year: 1,
  createdAt: 1,
  updatedAt: 1,
});
const booksModel = mongoose.model("book", booksSchema);

module.exports = {
  booksModel,
};
