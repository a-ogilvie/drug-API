const { expect } = require("chai");
const config = require("../config");
const knex = require("knex")(config.database);
const database = require("../database")(config.database);

const forcePromiseReject = function() {
  throw new Error("This promise should have failed, but did not.");
};

describe("drug", () => {
  describe("#get", () => {
    context("when bad params are given", () => {
      it("politely refuses", () => {
        database.drug
          .get({})
          .then(forcePromiseReject)
          .catch((err) => {
            expect(err.message).to.equal("Drug name must be provided.");
          });
      });
    });

    context("when good params are given", () => {
      it("retrieves the correct info", () => {
        const params = { name: "paracetamol" };
        database.drug.get(params).then((drugObj) => {
          expect(drugObj.name).to.equal(params.name);
          expect(drugObj.id).to.be.a("number");
        });
      });
    });
  });
});
