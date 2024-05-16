const { test, after, beforeEach, describe } = require("node:test");
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

  Blog.insertMany(initialBlogs);
});
describe("insertion of blog", () => {
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

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length + 1);
  });

  test("if likes property is missing, it will default to 0", async () => {
    const newBlog = {
      title: "stress management",
      author: "chaudhary",
      url: "www.stress.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const likes = response.body.map((blog) => blog.votes);
    assert.strictEqual(likes[likes.length - 1], 0);
  });

  test("if title and url are missing, return 400", async () => {
    const newBlog = {
      author: "tester",
      votes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    assert.strictEqual(initialBlogs.length, 2);
  });
});

describe("deletion of blog", () => {
  test("deletion succeed with valid blog id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

describe("updating of blog", () => {
  test("updating succeed with valid blog id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "updated blog",
      votes: 20,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const blogsAfterUpdating = blogsAtEnd[0];
    assert.strictEqual(blogsAfterUpdating.votes, 20);
  });
});

after(async () => {
  await mongoose.connection.close();
});
