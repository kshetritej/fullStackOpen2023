const blogsRouter = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/user")
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const jwtmiddleware = require("../middlewares/jwt.middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("author", { name: 1 });
  response.status(200).json(blogs);
});


blogsRouter.post("/", jwtmiddleware.tokenExtractor, async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  if (!decodedToken.id) return res.status(401).json({ message: "Unauthorized, invalid token" })
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    votes: body.votes || 0,
    author: decodedToken.id,
  })

  if (!blog.title || !blog.url) {
    response.status(400).json("error").end();
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", jwtmiddleware.tokenExtractor,jwtmiddleware.userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  const blog = await Blog.findById(request.params.id);
  const user = request.user

  if (blog.author.toString() == user.id) {
    await Blog.findByIdAndDelete(blog.id);
    logger.info('blog deleted')
  } else {
    response.status(401).json("blogs can be deleted by only those who added them")
  }
  response.status(204).end();
});

blogsRouter.put("/:id", jwtmiddleware.tokenExtractor,jwtmiddleware.userExtractor, async (request, response) => {
  const body = request.body;
  const { title, author, url, votes } = await Blog.findById(request.params.id);
  const user = request.user;

  logger.info('author id:', user.id.toString())

  if (user.id.toString() === author.toString()) {
    const blog = {
      title: body.title || title,
      author: body.author || author,
      url: body.url || url,
      votes: body.votes || votes,
    };

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json({
      success: true,
      data: blog
    });
  }

});


//deletes all blogs
blogsRouter.delete("/", async (req, res) => {
  logger.info('deleting blogs')
  const result = await Blog.deleteMany({});
  logger.info('blogs deleted');
  res.status(204).send()
})

module.exports = blogsRouter;
