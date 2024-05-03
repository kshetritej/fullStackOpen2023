const mongoose = require("mongoose");

const uri = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(uri)
  .then((result) => console.log(`db connection successfull!`))
  .catch((err) => console.log(`error connecting to database!`, err));
const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Contact", contactSchema);
