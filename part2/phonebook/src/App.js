import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { v4 as uuidv4 } from 'uuid'
import nameService from './services/persons.js'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])



  const addName = (event) => {
    event.preventDefault()
    // checks if person name already exists in the array
    const personExists = persons.find((per) => per.name.toLowerCase() === newName.toLowerCase());

    if (personExists) {
      const message = `${newName} already exists in Phonebook`
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return
    }
    const nameObject = {
      name: newName,
      phone: newNumber,
      id: uuidv4,
    }

    nameService.create(nameObject).then(returnedNames => {
      setPersons(persons.concat(returnedNames))
      setNewName('')
      setNewNumber('')
      setErrorMessage(`${newName} added successfully to Phonebook.`)
      setTimeout(() => setErrorMessage(null), 2000)
    })
  }

  //Let's filter the names
  const filteredNames = persons.filter((per) =>
    per.name.includes(newSearch)
  );

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

  //For deleting the entry
  const deleteName = (id) => {
    const personToDelete =() =>{
      for(let i =0; i< persons.length; i++){
        if(persons[i].id === id){
          return persons[i].name
        }
      }
    }
   const delPersonName = personToDelete()
    const addr = window.location.href
    window.confirm(`Delete ${delPersonName} ?`) ?
      nameService.deleteData(id).then(returnedData => {
        setPersons(returnedData)
      })
        .catch(error => {
          error = `The data no longer persist in the database`
          setErrorMessage(error)//handle error with the message
        }) :
      window.location.href = addr
  }


  //Final Return 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter searchValue={newSearch} onSearchChange={handleSearchValue} filterName={filteredNames} searchTerm={newSearch} />

      <PersonForm onSubmitAction={addName} nameValue={newName} onNameChange={handleNameChange} phoneValue={newNumber} onPhoneChange={handleNumberChange} />

      <h2>Numbers</h2>
      {persons.map((per) => (
        <Person key={per.id} name={per.name} number={per.phone}
          deleteName={() => deleteName(per.id)} />
      ))}
    </div>
  )
}

export default App
