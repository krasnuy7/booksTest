const router = require("express").Router();
const mongoose = require("mongoose");
const Collection = mongoose.model("Collection");

router.get("/", (req, res, next) => {
  Collection.find()
    .then((collections) => res.json(collections))
    .catch(next);
});

router.post("/", (req, res, next) => {
  const collection = new Collection(req.body);

  collection
    .save()
    .then((collection) => res.json(collection))
    .catch(next);
});

router.get("/:collectionId", (req, res, next) => {
  Collection.findById(req.params.collectionId)
    .populate("books")
    .then((collection) => res.json(collection))
    .catch(next);
});

router.delete("/:collectionId", (req, res, next) => {
  Collection.findByIdAndRemove(req.params.collectionId)
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put("/:collectionId", (req, res, next) => {
  Collection.findByIdAndUpdate(
    req.params.collectionId,
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((collection) => res.json(collection))
    .catch(next);
});

router.post("/:collectionId/books", (req, res, next) => {
  Collection.findByIdAndUpdate(
    req.params.collectionId,
    { $push: { books: req.body.bookId } },
    { runValidators: true, new: true }
  )
    .then((collection) => res.json(collection))
    .catch(next);
});

router.delete("/:collectionId/books/:bookId", (req, res, next) => {
  Collection.findByIdAndUpdate(
    req.params.collectionId,
    {
      $pull: { books: req.params.bookId },
    },
    { runValidators: true, new: true }
  )
    .then((collection) => res.json(collection))
    .catch(next);
});

module.exports = router;
