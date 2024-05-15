const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogSchema");
const helper = require("../utils/backend_test_helper");
const initialBlogs = helper.initialBlogs;

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let newBlog = new Blog(helper.initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(helper.initialBlogs[1]);
  await newBlog.save();
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog is saved with identifier id", async () => {
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "new blog",
    author: "tester",
    url: "www.test.com",
    votes: 10,
  }; 

  api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length + 1);
});

after(async () => {
  await mongoose.connection.close();
});
