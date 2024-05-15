const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoUri = config.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB: ", error));

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    required: true,
    isUrl: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
