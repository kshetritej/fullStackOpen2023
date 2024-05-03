import { useState, useEffect } from "react";
import {
  getPersons,
  getOnePerson,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services/person.query";

function App() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getPersons().then((response) => setPerson(response.data));
    };

    fetchData();
  }, []);

  const searchResults = person.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // const personExists =
  //   person.length > 0 &&
  //   person.find((per) => per.name.toLowerCase() === name.toLowerCase());
  // const phoneExists =
  //   person.length > 0 && person.find((per) => per.number === number);

  const handleSubmit = () => {
    event.preventDefault();
    // if (personExists) {
    //   window.confirm(
    //     `${name} name already exist on the phonebook, replace the number with new one?`
    //   );
    //   const selectedPerson = person.find((per) => per.name === name);
    //   selectedPerson.number = number;
    //   setPerson([...person]);
    //   return;
    // }
    // if (phoneExists) {
    //   window.confirm(`${number}  already exist on the phonebook`);
    //   return;
    // }
    const body = {
      name: name,
      phone: number,
    };
    createPerson(body);
    setPerson([...person, body]);
    setName("");
    setNumber("");
  };

  const handleDelete = (id) => {
    const name = person.find((p) => p.id === id).name;
    const decision = window.confirm(`Are you sure you want to delete ${name}`);
    if (decision === false) return;
    deletePerson(id);
    const newPerson = person.filter((p) => p.id !== id);
    setPerson(newPerson);
  };

  return (
    <>
      <form>
        <label htmlFor="name">Search by name:</label>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="name"
          id="name"
        />
        <div>
          <ul>
            {search === "" && <li>Start typing to search for the results</li>}
            {searchResults.length > 0 && search !== "" ? (
              searchResults.map((result) => (
                <li key={result.id}>{result.name}</li>
              ))
            ) : (
              <li>No result found </li>
            )}
          </ul>
        </div>
      </form>

      <h2>Add a new Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          value={name}
        />{" "}
        &nbsp;
        <input
          onChange={(e) => setNumber(e.target.value)}
          type="number"
          placeholder="Enter number"
          name="number"
          id="number"
          value={number}
        />{" "}
        &nbsp;
        <button type="submit">Add</button>
      </form>
      <div>
        <h2>Numbers </h2>
        {person.length > 0 &&
          person.map((p) => (
            <li key={p.id}>
              {p.name} : {p.number}{" "}
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </li>
          ))}
      </div>
    </>
  );
}

export default App;
