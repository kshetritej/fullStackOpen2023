import { useState } from 'react'
import Person from './Person'

const App = () => {
	const [person, setPerson] = useState([
		{name: 'John Cena', phone: '911'},
	])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [searchTerm, setSearchTerm] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
		console.log(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewPhone(event.target.value)
		console.log(event.target.value)
	}
	const handleSearch = (event) =>{
		setSearchTerm(event.target.value)
	}
	const filteredPersons = person.filter((per) =>
    per.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


	const addPerson = (event) => {
		event.preventDefault();
		const nameExists = person.filter((per) => per.name === newName);

		if (nameExists.length > 0) {
			alert(`${newName} already exists.`)
			return;
		}

		const personObject = {
			name: newName,
			phone: newPhone,
			id: person.length + 1,
		};

		console.log("personObj", personObject);
		console.log("onlyPerson", person);
		setPerson([...person, personObject]);
		setNewName("");
		setNewPhone("");
	};


	return (
		<div>
			<div>
				<h2>Phonebook </h2>
				<div className="search">
					<h2>Search Phonebook</h2>
					<input type="search" value = {searchTerm} onChange = {handleSearch}/>
					<div className ="serach-results">
						{filteredPersons.map((per) => (
          <Person key={per.id} name={per.name} number={per.phone} />
        ))}
					</div>
				</div>
				<form onSubmit={addPerson} >
					<h2>Add to Phonebook</h2>
					<div>
						Name: <input type="text" value={newName} onChange={handleNameChange} />
					</div>

					<div>
						Phone: <input type="number" value={newPhone} onChange={handleNumberChange} />
					</div>

					<div>
						<button type="submit"> Add </button>
					</div>
				</form>
			</div>
			<div>
				<h2>Phonebook List</h2>
				{person.map(per =>
					<Person key={per.id} name={per.name} number={per.phone} />)}
			</div>
		</div>
	)
}

export default App
