const { expect } = require("chai");
const config = require("../config");
config.database.connection.database = "drug_test";
const knex = require("knex")(config.database);
const database = require("../database")(config.database);

const forcePromiseReject = function() {
  throw new Error("This promise should have failed, but did not.");
};

describe("drug", () => {
  describe("#get", () => {
    before(() => {
      newDrug = {
        name: "aspirin",
        description: "another painkiller",
        price: "0.75",
        stock: 3
      };

      return database.drug.post(newDrug);
    });

    after(() => knex("drug").del());

    it("returns a list of all drugs available", () => {
      database.drug.get().then((drugs) => {
        expect(drugs).to.be.an("array");
        expect(drugs[0].id).to.be.a("number");
      });
    });
  });

  describe("#post", () => {
    let newDrug;
    context("when bad params are given", () => {
      it("politely refuses", () => {
        database.drug
          .post({})
          .then(forcePromiseReject)
          .catch((err) => {
            expect(err.message).to.equal("Must provide name!");
          });
      });
    });

    context("when good params are given", () => {
      before(() => {
        newDrug = {
          name: "paracetamol",
          description: "common painkiller",
          price: "0.75",
          stock: 3
        };
      });

      after(() => knex("drug").del());

      it("adds to the database", () => {
        return database.drug.post(newDrug).then((drug) => {
          expect(drug).to.include(newDrug);
          expect(drug.id).to.be.a("number");
        });
      });

      it("rejects duplicate entries", () => {
        database.drug
          .post(newDrug)
          .then(forcePromiseReject)
          .catch((err) => {
            expect(err.message).to.equal(
              "That drug already exists in the database."
            );
          });
      });
    });
  });
});
