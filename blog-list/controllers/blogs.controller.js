const blogsRouter = require("express").Router();
const Blog = require("../models/blogSchema");

blogsRouter.get("/", async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (!blog.title || !blog.url) {
    response.status(400).json("error").end();
  }
  await blog.save().then((result) => {
    response.status(201).json(result);
  });
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
