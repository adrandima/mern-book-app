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
  test("It should respond the GET method", async () => {
    const response = await request(app)
      .get("/api/book?page=1&limit=10")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the /books path", () => {
  test("It should respond the GET method", async () => {
    const response = await request(app)
      .get("/api/book")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });

  test("It should respond the POST method", async () => {
    const response = await request(app)
      .post("/api/book")
      .set("Authorization", token)
      .send({
        name: "Sample Book10",
        isbn: "1234567890",
        author: {
          first_name: "John2",
          last_name: "Doe",
        },
      });
    expect(response.statusCode).toBe(201);
  });
});

describe("Test the /books/:id path", () => {
  test("It should respond the GET method", async () => {
    const response = await request(app)
      .get("/api/book/64cc76bfe2831df970b6dd74")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });

  test("It should respond the PUT method", async () => {
    const response = await request(app)
      .put("/api/book/64cc76bfe2831df970b6dd74")
      .set("Authorization", token)
      .send({
        name: "Sample Book8",
        isbn: "12345678906",
      });
    expect(response.statusCode).toBe(200);
  });

  test("It should respond the DELETE method", async () => {
    const response = await request(app)
      .delete("/api/book/64cc69cd5b6cd48f5c1c931b")
      .set("Authorization", token);
    expect(response.statusCode).toBe(404);
  });
});
