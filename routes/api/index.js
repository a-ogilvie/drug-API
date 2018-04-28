const express = require("express");

const router = express.Router();

const drugRouter = require("./drug");

module.exports = function(database) {
  router.use("/drug", drugRouter(database));

  return router;
};
