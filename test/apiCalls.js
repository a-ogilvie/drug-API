const { expect } = require("chai");
const config = require("../config");
const database = require("../database")(config.database);
const apiRouter = require("../routes/api")(database);

const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const sinon = require("sinon");

const app = require("../index.js");

app.use("/api", apiRouter);

app.listen(config.database.port, () => {
  console.log("Server listening for apiCalls tests!");
});

describe("GET /api", () => {
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
      .returns(Promise.resolve(fakeResponse));
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

describe("GET /api/{}", () => {
  let status;
  let response;
  const fakeResponse = {
    id: 1,
    name: "penicillin",
    description: "A famous antibiotic made from mouldy bread.",
    price: "1.30",
    stock: 500
  };
  let stub;

  context("when drug is present", () => {
    before((done) => {
      stub = sinon
        .stub(database.drug, "get")
        .returns(Promise.resolve(fakeResponse));
      chai
        .request(app)
        .get("/api/drug/penicillin")
        .set("Content-Type", "application/json")
        .end((_, res) => {
          status = res.status;
          response = res.text;
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

    it("should provide a single drug.", (done) => {
      response.should.be.a("string");
      JSON.parse(response).should.be.an("object");
      done();
    });
  });

  context("when drug is absent", () => {
    before((done) => {
      stub = sinon
        .stub(database.drug, "get")
        .returns(Promise.reject(new Error("Drug not found!")));
      chai
        .request(app)
        .get("/api/drug/penicillin")
        .set("Content-Type", "application/json")
        .end((_, res) => {
          status = res.status;
          response = res.text;
          done();
        });
    });

    after(() => {
      stub.restore();
    });

    it("should return status 400.", (done) => {
      status.should.equal(400);
      done();
    });

    it("should provide a single drug.", (done) => {
      response.should.be.a("string");
      response.should.equal("Drug not found!");
      done();
    });
  });
});

describe("POST /api", () => {
  context("when drug is not in database", () => {
    let status;
    let response;
    const fakeResponse = {
      id: 1,
      name: "penicillin",
      description: "A famous antibiotic made from mouldy bread.",
      price: "1.30",
      stock: 500
    };
    let stub;

    before((done) => {
      stub = sinon
        .stub(database.drug, "post")
        .returns(Promise.resolve(fakeResponse));
      chai
        .request(app)
        .post("/api/drug")
        .set("Content-Type", "application/json")
        .end((_, res) => {
          status = res.status;
          response = res.text;
          done();
        });
    });

    after(() => {
      stub.restore();
    });

    it("should return status 201.", (done) => {
      status.should.equal(201);
      done();
    });

    it("should return the created drug.", (done) => {
      response.should.be.a("string");
      JSON.parse(response).should.be.an("object");
      done();
    });
  });

  context("when drug already exists in database", () => {
    let status;
    let response;
    let stub;

    before((done) => {
      stub = sinon
        .stub(database.drug, "post")
        .returns(
          Promise.reject(new Error("That drug already exists in the database."))
        );
      chai
        .request(app)
        .post("/api/drug")
        .set("Content-Type", "application/json")
        .end((_, res) => {
          status = res.status;
          response = res.text;
          done();
        });
    });

    after(() => {
      stub.restore();
    });

    it("should return status 409.", (done) => {
      status.should.equal(409);
      done();
    });

    it("should return an error string.", (done) => {
      response.should.be.a("string");
      response.should.equal("That drug already exists in the database.");
      done();
    });
  });
});
