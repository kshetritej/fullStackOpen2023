const { error } = require("../utils/logger");

const unknownEndpoint = (req, res) => {
  error("Unknown endpoint");
  res.status(400).json({ message: "Unknown endpoint" });
};

module.exports = unknownEndpoint;
