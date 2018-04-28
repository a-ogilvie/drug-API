const express = require("express");

const router = express.Router();

module.exports = function(database) {
  router.get("/", (req, res) => {
    database.drug
      .get({ name: req.query.name })
      .then((drug) => res.status(200).json(drug));
  });

  router.post("/", (req, res) => {
    database.drug
      .create({
        name: req.query.name,
        type: req.query.type,
        description: req.query.description,
        price: req.query.price,
        stock: req.query.stock
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
