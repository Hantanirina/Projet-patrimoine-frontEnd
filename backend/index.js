const express = require("express");
const bodyParser = require("body-parser");
const possessionRoutes = require("./Route/PossessionRoute");

const app = express();

app.use(bodyParser.json());

app.use("/possession", PossessionRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("there is an error");
});

module.exports = app;
