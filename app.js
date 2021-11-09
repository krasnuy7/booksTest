const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const DEV = process.env.NODE_ENV !== "production";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const root = path.resolve(__dirname, "client/build");
app.use(express.static(root));

if (DEV) {
  app.use(require("errorhandler")());
}

if (DEV) {
  mongoose.connect("mongodb://localhost/wartech-test-task", {
    useMongoClient: true,
  });
  mongoose.set("debug", true);
} else {
  mongoose.connect(process.env.MONGODB_URI);
}

require("./models");

app.use("/api", require("./routes"));

app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (DEV) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });
}

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const server = app.listen(process.env.PORT || 3001, () => {
  console.log("Listening on port " + server.address().port);
});
