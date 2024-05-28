const { test, describe } = require("node:test");
const supertest = require("supertest");
const { assert } = require("node:assert");


const moongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

describe("creation of new user",() => {
    test("user is not created if password is not provided", async () => {
       const newUser = {
        name: "tej",
        username: "kshetritej",
       } 

       await api
       .post("/api/user/register")
       .send(newUser)
       .expect(400)
       .expect("Content-Type", /application\/json/);
    })
})