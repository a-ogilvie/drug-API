const config = require("./config");

const database = require("./database")(config.database);

const apiRouter = require("./routes/api")(database);

const bodyParser = require("body-parser");

const ejsLayouts = require("express-ejs-layouts");
const apiInfo = require("./views/apiInfo.js");

const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

app.use("/", express.static("public"));

app.use("/api", apiRouter);

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.get("/", (req, res) => {
  res.render("pages/index", { apiInfo });
});

app.listen(config.express.port);

console.log(`Drug API server started on port: ${config.express.port}`);

module.exports = app;
