const config = require("./config");

const database = require("./database")(config);

const apiRouter = require("./routes/api")(database);

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Drug API server started on port: ${PORT}`);
