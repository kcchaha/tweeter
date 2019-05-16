"use strict";

// Basic express setup:

const PORT          = 3000;
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(sassMiddleware({
  src: path.join(__dirname, 'styles'),
  dest: path.join('public', 'styles'),
  debug: true,
  // force: true,
  outputStyle: 'compressed',
  prefix:  '/styles', error: console.log// Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB setup
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  } else {
    console.log(`Successfully connected to DB: ${MONGODB_URI}`);
    const DataHelpers = require("./lib/data-helpers.js")(db);
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    app.use("/tweets", tweetsRoutes);
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
