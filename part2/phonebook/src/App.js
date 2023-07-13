import { useState, useEffect } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3000/persons')
    .then(response =>{
      setPersons(response.data)
    })
  }

  useEffect(hook,[])

  const addName = (event) => {
    event.preventDefault()
    // checks if person name already exists in the array
    const personExists = persons.find((per) => per.name.toLowerCase() === newName.toLowerCase());
    if (personExists) {
      alert(`${newName} already exists in the phonebook.`)
      return
    }
    const nameObject = {
      name: newName,
      phone: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewNumber('')
    setNewName('')
    console.log('added', persons)
  }

  //Let's filter the names
  const filteredNames = persons.filter((per) =>
    per.name.toLowerCase().includes(newSearch.toLowerCase()));

  //input handlers
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  const handleSearchValue = (event) => {
    event.preventDefault()
    setSearch(event.target.value);
    console.log(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Final Return 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={newSearch} onSearchChange={handleSearchValue} filterName={filteredNames} searchTerm={newSearch} />

      <PersonForm onSubmitAction={addName} nameValue={newName} onNameChange={handleNameChange} phoneValue={newNumber} onPhoneChange={handleNumberChange} />

      <h2>Numbers</h2>
      {persons.map((per) => (
        <Person key={per.id} name={per.name} number={per.phone} />
      ))}
    </div>
  )
}

export default App