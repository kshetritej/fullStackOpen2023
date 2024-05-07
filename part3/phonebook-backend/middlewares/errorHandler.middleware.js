const errorHandler = (error, request, response, next) => {
  console.log("ERROR HANDLER");
  if (error.name === "CastError") {
    console.log(" CAST ERROR");
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log("VALIDATION ERROR");
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = errorHandler;
