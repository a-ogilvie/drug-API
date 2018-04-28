const config = require("./config");

const database = require("./database")(config.database);

const apiRouter = require("./routes/api")(database);

const express = require("express");
const app = express();

app.use("/api", apiRouter);

app.listen(config.express.port);

console.log(`Drug API server started on port: ${config.express.port}`);
