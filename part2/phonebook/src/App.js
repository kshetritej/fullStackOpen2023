import { useState } from 'react'
import Person from './Person'

const App = () => {
	const [person, setPerson] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	
	const handleNameChange = (event) =>{
		
		setNewName(event.target.value)
		console.log(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewPhone(event.target.value)
		console.log(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			phone: newPhone,
			id: person.length+1,
		}
		console.log(personObject)
		console.log(person)
		setPerson(person.concat(personObject))
		setNewName('')
		setNewPhone('')
	}

	return (
		<div>
			<div>
			<h2> Add to Phonebook </h2>
			<form onSubmit = {addPerson} >
				<div>
				Name: <input type="text" value ={newName} onChange = {handleNameChange} />
				</div>
			
				<div>
				Phone: <input type="number" value ={newPhone} onChange = {handleNumberChange} />
				</div>
				
				<div>
				<button type="submit"> Add </button>
				</div>
			</form>
			</div>
			<div>
			<h2>Phonebook</h2>
			{person.map(per =>
				<Person key={per.id} name={per.name} number={per.phone} />)}
			</div>
		</div>
	)
}

export default App
