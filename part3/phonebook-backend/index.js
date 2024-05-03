const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config();

const Contact = require("./models/contactModel");

morgan.token("req-body", (req, res) => {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
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
  Contact.findById(id).then((person) => response.json(person));
});

//works
app.post("/api/persons/", (req, res) => {
  const body = req.body;

  if (!body.name || !body.phone) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  const newPerson = new Contact({
    name: body.name,
    phone: body.phone,
  });

  newPerson.save().then((newContact) => {
    console.log(`Added ${newContact.name} : ${newContact.phone} to Phonebook!`);
  });
  res.status(201).json(newPerson);
});

//works
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete(id).then((result) => res.status(203).json(result));
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

app.listen(process.env.PORT, () => {
  console.log("Server running on port ", process.env.PORT);
});
