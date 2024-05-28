const blogsRouter = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/user")
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs =   await Blog.find({}).populate('');
  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = await User.findById(request.body.userId);

  const blog = new Blog({
    title: request.body.title,
    url: request.body.url,
    votes: request.body.votes || 0,
    author: request.body.userId,
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
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
