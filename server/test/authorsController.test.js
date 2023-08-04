import request from "supertest";
import app from "../index";
var token = null;

beforeEach(function (done) {
  request(app)
    .post("/api/auth/login")
    .send({ email: "test2@gmail.com", password: "test1234" })
    .end(function (err, res) {
      token = res.body.token; // Or something
      done();
    });
});

describe("Test the root path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/api/author").set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the /authors path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app)
      .get("/api/author/64cc6da8e6fc541c5a49860b")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });

  test("It should respond to the POST method", async () => {
    const response = await request(app)
      .post("/api/author")
      .set("Authorization", token)
      .send({ first_name: "John", last_name: "Doe" });
    expect(response.statusCode).toBe(201);
  });

  test("It should respond to the PUT method", async () => {
    const response = await request(app)
      .put("/api/author/64cc6da8e6fc541c5a49860b")
      .set("Authorization", token)
      .send({ first_name: "test", last_name: "Doe" });
    expect(response.statusCode).toBe(200);
  });

  test("It should respond to the DELETE method", async () => {
    const response = await request(app)
      .delete("/api/author/1")
      .set("Authorization", token);
    expect(response.statusCode).toBe(404);
  });
});
