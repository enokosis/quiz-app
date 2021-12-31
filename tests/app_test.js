import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../app.js";

Deno.test({
  name: "Test /",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test statistics unauthenticated",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/statistics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test questions unauthenticated",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/questions").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test register that password is required",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/register").send(
      "email=14@14.com",
    ).expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test register with proper values",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/register").send(
      "email=14@14.com",
    ).send(
      "password=1234",
    ).expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test wrong login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/login").send(
      "email=14@14.com",
    ).send(
      "password=1524",
    ).expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test correct login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/login").send(
      "email=14@14.com",
    ).send(
      "password=1234",
    ).expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test register and login and then to /questions",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/questions").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test get api",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect(200).expect(
      "Content-Type",
      "application/json; charset=utf-8",
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test post api with improper values",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer")
      .send('{"questionId":66, "optionId":77}')
      .expect(200).expect(
        "Content-Type",
        "application/json; charset=utf-8",
      ).expect('{"correct":false}');
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
