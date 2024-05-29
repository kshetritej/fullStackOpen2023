const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if(err.name === "MongoServerError" && err.message.includes("duplicate key error")){
    return res.status(401).json({"message":"username is already exist on database."})
  }
  if(err.name === "JsonWebTokenError") return res.status(401).json({message: "token invalid"})
  next(err);
};

module.exports = errorHandler;
