const express = require("express");

const router = express.Router();

module.exports = function(database) {
  router.get("/", (req, res) => {
    database.drug.get().then(() => res.status(200));
  });

  return router;
};
