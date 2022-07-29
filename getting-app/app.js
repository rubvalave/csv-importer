const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const helmet = require("helmet");
const router = require("./routes/index");

mongoose.connect('mongodb://mongo:27017/vizz-importer', {useNewUrlParser: true, useUnifiedTopology:true})
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json())


app.use("/", router);

module.exports = app;
