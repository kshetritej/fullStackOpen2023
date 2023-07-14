import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import nameService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

  useEffect (() =>{
    nameService
    .getAll()
    .then(initialNames => {
      setPersons(initialNames)
    })
  },[])
  // useEffect(()=>{
  //   axios.get('http://localhost:3001/persons').then(response =>{
  //     setPersons(response.data)
  //   })
  // },[])

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
    // axios.post("http://localhost:3001/persons",nameObject).then(response =>{
    //   setPersons(persons.concat(response.data))
    //   setNewName('')
    //   setNewNumber('')
    // })
    nameService.create(nameObject).then(returnedNames =>{
      setPersons(persons.concat(returnedNames))
      setNewName('')
      setNewNumber('')
    })
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