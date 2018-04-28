const config = require("./config");

const database = require("./database")(config);

const apiRouter = require("./routes/api")(database);

const express = require("express");
const app = express();

app.listen(config.express.port);

console.log(`Drug API server started on port: ${config.express.port}`);
