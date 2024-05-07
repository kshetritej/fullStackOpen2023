const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

const Contact = require("./models/contactModel");
const errorHandler = require("./middlewares/errorHandler.middleware");

morgan.token("req-body", (req, res) => {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("dist"));

app.use(
  morgan(
    `:method :url :status :res[content-length] :req[body] - :response-time ms :req-body`
  )
);

//works
app.get("/api/persons/", (request, response) => {
  Contact.find({}).then((persons) => {
    console.log(persons.length);
    response.json(persons);
  });
});

//works
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Contact.findById(id).then((person) => {
    response.json(person);
  });
});

//works
app.post("/api/persons/", (req, res, next) => {
  console.log("POST REQUEST");
  const body = req.body;
  console.log("got REQUEST");
  console.log("trying to save");
  if (!body.name || !body.phone) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  console.log("creating new person");
  const newPerson = new Contact({
    name: body.name,
    phone: body.phone,
  });
  console.log("saving ...");
  newPerson
    .save()
    .then((newContact) => {
      res.status(201).json(newContact);
    })
    .catch((error) => {
      console.log("Error: ", error.message);
      console.log("going to errorhandler");
      next(error);
    });
});

//update
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const contact = {
    name: body.name,
    phone: body.phone,
  };

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

//works
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete(id).then((result) => res.status(204).json(result));
});

//works
app.get("/api/info", (req, res) => {
  Contact.find({}).then((person) => {
    const date = new Date();
    res.send(
      `<p>Phonebook has info for ${person.length} people</p>
    <p>${date}</p>`
    );
  });
});

app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log("Server running on port ", process.env.PORT);
});
