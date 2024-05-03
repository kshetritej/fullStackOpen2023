function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    console.log("Validation error");
  }
  next(error);
}


module.exports = errorHandler;
