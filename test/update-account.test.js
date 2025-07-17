const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("PUT /accounts/:id", () => {
  it("Should update an existing account and return 200 with Json body.", async () => {
    const newAcc = await request(app)
      .post("/accounts")
      .send({ name: "Jose Biden", email: "jb@gmail.com" });

    const id = newAcc.body.id;

    const payload = {
      name: "Jose Biden - UPDATED",
      email: "jb@gmail.com - UPDATED",
    };

    const res = await request(app).put(`/accounts/${id}`).send(payload);

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(id);
    expect(res.body.name).to.equal(payload.name);
    expect(res.body.email).to.equal(payload.email);
  });
  it("Should return 404 if updating non-existing account", async () => {
    const res = await request(app).put("/accounts/9999").send({
      name: "Jose Biden - UPDATED",
      email: "jb@gmail.com - UPDATED",
    });
    expect(res.status).to.equal(404);
  });
});
