const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("GET /accounts/:id", () => {
  it("Should return 200 and this account if it exists.", async () => {
    const newAcc = await request(app)
      .post("/accounts")
      .send({ name: "Michael", email: "jb@gmail.com" });

    const id = newAcc.body.id;

    const res = await request(app).get(`/accounts/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(id);
    expect(res.body.name).to.equal("Michael");
  });
  it("Should return 404 if non-existing account", async () => {
    const res = await request(app).get("/accounts/9999");
    expect(res.status).to.equal(404);
  });
});
