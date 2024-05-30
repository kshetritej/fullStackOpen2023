const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if(err.name === "MongoServerError" && err.message.includes("duplicate key error")){
    return res.status(401).json({"message":"username is already exist on database."})
  }
  if(err.name === "JsonWebTokenError") return res.status(401).json({message: "token invalid"})
  if(err.name === 'SyntaxError') return res.status(400).json({message: 'syntax error'})
  if(err.name === 'TokenExpiredError') return res.status(400).json({message: 'token expired'})
  next(err);

};

module.exports = errorHandler;
