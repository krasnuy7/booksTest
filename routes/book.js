const router = require("express").Router();
const mongoose = require("mongoose");
const Book = mongoose.model("Book");

router.get("/", (req, res, next) => {
  Book.find()
    .then((books) => res.json(books))
    .catch(next);
});

router.post("/", (req, res, next) => {
  const book = new Book(req.body);

  book
    .save()
    .then((book) => res.json(book))
    .catch(next);
});

router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((book) => res.json(book))
    .catch(next);
});

router.delete("/:bookId", (req, res, next) => {
  Book.findByIdAndRemove(req.params.bookId)
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put("/:bookId", (req, res, next) => {
  console.log("req.body", req.body);
  Book.findByIdAndUpdate(
    req.params.bookId,
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((book) => res.json(book))
    .catch(next);
});

module.exports = router;
