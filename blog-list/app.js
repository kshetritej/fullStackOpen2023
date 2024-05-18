const express = require("express");
require('express-async-errors');
const cors = require("cors");
const blogsRouter = require("./controllers/blogs.controller");
const userRouter = require("./controllers/user.controller");
const errorHandler = require("./middlewares/errorHandler");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const app = express();
app.use(cors()) 
app.use(express.json())

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use(unknownEndpoint)

app.use(errorHandler)

module.exports = app;