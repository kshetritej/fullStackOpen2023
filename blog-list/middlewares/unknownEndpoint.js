const logger = require("../utils/logger");

const unknownEndpoint = (req, res) => {
  logger.error("Unknown endpoint");
  res.status(400).json({ message: "Unknown endpoint" });
};

module.exports = unknownEndpoint;
