const { expect } = require("chai");
const config = require("../config");
config.database.connection.database = "drug_test";
const knex = require("knex")(config.database);
const database = require("../database")(config.database);

const forcePromiseReject = function() {
  throw new Error("This promise should have failed, but did not.");
};

describe("drug", () => {
  describe("db.drug.get", () => {
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

    context("when GET all drugs", () => {
      it("returns a list of all drugs available", () => {
        database.drug.list().then((drugs) => {
          expect(drugs).to.be.an("array");
          expect(drugs[0].id).to.be.a("number");
        });
      });
    });

    context("when GET one drug", () => {
      it("returns a single drug when given correct URI", () => {
        database.drug.get({ name: "aspirin" }).then((drug) => {
          expect(drug.name).to.equal("aspirin");
        });
      });
    });
  });

  describe("db.drug.post", () => {
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

  describe("db.drug.patch", () => {
    context("when bad params are given", () => {
      it("politely refuses", () => {
        database.drug
          .patch({ name: "" })
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
        return database.drug.post(newDrug);
      });

      after(() => {
        return knex("drug").del();
      });

      it("alters a single entry in the database", () => {
        return database.drug
          .get(newDrug)
          .then((drug) => {
            const newInfo = {
              name: "paracetamol",
              stock: 200
            };
            return database.drug.patch(newInfo);
          })
          .then((drug) => {
            expect(drug.stock).to.equal(200);
          });
      });

      it("alters multiple entries in the database", () => {
        return database.drug
          .get(newDrug)
          .then((drug) => {
            const newInfo = {
              name: "paracetamol",
              price: "2.30",
              stock: 65
            };
            return database.drug.patch(newInfo);
          })
          .then((drug) => {
            expect(drug.price).to.equal("2.30");
            expect(drug.stock).to.equal(65);
          });
      });

      it("fails when drug is not present", () => {
        return database.drug
          .get({ name: "viagra" })
          .then(forcePromiseReject)
          .catch((err) => {
            expect(err.message).to.equal("Drug not found!");
          });
      });
    });
  });

  describe("db.drug.delete", () => {
    before(() => {
      newDrug = {
        name: "paracetamol",
        description: "common painkiller",
        price: "0.75",
        stock: 3
      };
      return database.drug.post(newDrug);
    });

    after(() => {
      return knex("drug").del();
    });

    it("deletes a single entry from the database", () => {
      return database.drug
        .delete(newDrug)
        .then((response) => {
          return database.drug.get(newDrug);
        })
        .then(forcePromiseReject)
        .catch((err) => {
          expect(err.message).to.equal("Drug not found!");
        });
    });

    it("fails when drug is not present", () => {
      return database.drug
        .delete(newDrug)
        .then(forcePromiseReject)
        .catch((err) => {
          expect(err.message).to.equal("Drug not found!");
        });
    });
  });
});
