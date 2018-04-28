const express = require("express");

const router = express.Router();

module.exports = function(database) {
  router.get("/", (req, res) => {
    database.drug.list().then((drugs) => res.status(200).json(drugs));
  });

  router.get("/:name", (req, res) => {
    database.drug
      .get(req.params)
      .then((drug) => res.status(200).json(drug))
      .catch((err) => {
        return res.status(400).send(err.message);
      });
  });

  router.post("/", (req, res) => {
    database.drug
      .post({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
      })
      .then((drug) => res.status(201).json(drug))
      .catch((err) => {
        if (err.message === "That drug already exists!") {
          return database.drug
            .get({ name: req.body.name })
            .then((drug) => res.status(200).json(drug));
        }

        return res.status(400).send(err.message);
      });
  });

  return router;
};
