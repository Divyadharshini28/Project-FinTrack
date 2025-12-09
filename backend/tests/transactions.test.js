const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // or "../server"
const expect = chai.expect;

chai.use(chaiHttp);

describe("Transactions API", () => {
  it("should create a new transaction", (done) => {
    chai
      .request(app)
      .post("/api/transactions")
      .set("Authorization", "Bearer YOUR_TEST_TOKEN")
      .send({
        title: "Groceries",
        amount: 1200,
        category: "Food",
        type: "expense",
        date: "2025-11-29",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("newTx");
        done();
      });
  });
});
