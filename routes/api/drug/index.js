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

  router.patch("/:name", (req, res) => {
    database.drug
      .get(req.params)
      .then((drug) => {
        const newInfo = {
          id: drug.id,
          name: drug.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock
        };
        return database.drug.patch(newInfo);
      })
      .then((drug) => res.status(200).json(drug))
      .catch((err) => {
        return res.status(400).send(err.message);
      });
  });

  router.delete("/:name", (req, res) => {
    database.drug
      .delete(req.params)
      .then(() => {
        return res.status(200).send("Drug deleted.");
      })
      .catch((err) => {
        return res.status(404).send(err.message);
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
        return res.status(409).send(err.message);
      });
  });

  return router;
};
