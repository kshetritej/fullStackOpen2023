const blogsRouter = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/user")
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const {tokenExtractor }= require("../middlewares/jwt.middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("author", { name: 1 });
  response.status(200).json(blogs);
});


blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(tokenExtractor(request), process.env.JWT_SECRET);

  if (!decodedToken.id) return res.status(401).json({ message: "Unauthorized, invalid token" })
  const user = await User.findById(decodedToken.id);
  logger.info(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    url: body.url,
    votes: body.votes || 0,
    author: decodedToken.id,
  })

  logger.info(user.name);
  if (!blog.title || !blog.url) {
    response.status(400).json("error").end();
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const { title, author, url, votes } = await Blog.findById(request.params.id);

  const blog = {
    title: body.title || title,
    author: body.author || author,
    url: body.url || url,
    votes: body.votes || votes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog);
});

module.exports = blogsRouter;
