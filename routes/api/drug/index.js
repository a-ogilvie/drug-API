const express = require("express");

const router = express.Router();

const OK = 200;
const CREATED = 201;
const BAD_REQ = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;

module.exports = function(database) {
  router.get("/", (req, res) => {
    database.drug.list().then((drugs) => res.status(OK).json(drugs));
  });

  router.get("/:name", (req, res) => {
    database.drug
      .get(req.params)
      .then((drug) => res.status(OK).json(drug))
      .catch((err) => res.status(BAD_REQ).send(err.message));
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
      .then((drug) => res.status(OK).json(drug))
      .catch((err) => res.status(NOT_FOUND).send(err.message));
  });

  router.delete("/:name", (req, res) => {
    database.drug
      .delete(req.params)
      .then(() => res.status(OK).send("Drug deleted."))
      .catch((err) => res.status(NOT_FOUND).send(err.message));
  });

  router.post("/", (req, res) => {
    database.drug
      .post({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
      })
      .then((drug) => res.status(CREATED).json(drug))
      .catch((err) => res.status(CONFLICT).send(err.message));
  });

  return router;
};
