const Blogs = require("../models/blogSchema");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const initialBlogs = [
  {
    title: "First blog",
    author: "John Doe",
    url: "http://www.example.com",
    votes: 10,
  },
  {
    title: "Second blog",
    author: "Jane Doe",
    url: "http://www.example.com",
    votes: 20,
  },
];

const blogsInDb = async () => {
  await api.get("/api/blogs");
  const blogs = await Blogs.find({});
  return blogs;
};

module.exports = { initialBlogs, blogsInDb };
