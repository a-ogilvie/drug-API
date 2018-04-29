const { expect } = require("chai");
const config = require("../config");
const database = require("../database")(config.database);
const apiRouter = require("../routes/api")(database);

const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const sinon = require("sinon");
const Promise = require("bluebird");

const app = require("../index.js");

app.use("/api", apiRouter);

app.listen(config.database.port, () => {
  console.log("Server listening for apiCalls tests!");
});

describe.only("GET /api", () => {
  let status;
  let response;
  const fakeResponse = [
    {
      id: 1,
      name: "penicillin",
      description: "A famous antibiotic made from mouldy bread.",
      price: "1.30",
      stock: 500
    }
  ];
  let stub;

  before((done) => {
    stub = sinon
      .stub(database.drug, "list")
      .returns(Promise.try(() => fakeResponse));
    chai
      .request(app)
      .get("/api/drug")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        status = res.status;
        response = res.text;
        console.log(response);
        done();
      });
  });

  after(() => {
    stub.restore();
  });

  it("should return status 200.", (done) => {
    status.should.equal(200);
    done();
  });

  it("should provide a list of drugs available.", (done) => {
    response.should.be.a("string");
    JSON.parse(response).should.be.an("array");
    done();
  });
});
