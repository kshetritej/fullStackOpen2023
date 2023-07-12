import {useState} from 'react'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState ([
    {
      id:1,
      name: 'Arto Hellas',
      phone: 9854674,
    },
    {
      id:2,
      name: 'Tej Bahadur Gharti Kshetri',
      phone:9841,
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    // checks if person name already exists in the array
    const personExists = persons.find((per) => per.name.toLowerCase() === newName.toLowerCase());
    if(personExists){
      alert(`${newName} already exists in the phonebook.`)
      return
    }
    const nameObject = {
      name: newName,
      phone: newNumber,
      id:persons.length +1,
    }
    setPersons(persons.concat(nameObject))
    setNewNumber('')
    setNewName('')
    console.log('added', persons)
  }
  const handleNameChange = (event) =>{
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  const handleSearchValue = (event) =>{
    event.preventDefault()
    setSearch(event.target.value);
    console.log(event.target.value)
  }
  const filteredPersons = persons.filter((per) =>
  per.name.toLowerCase().includes(newSearch.toLowerCase()));

  const handleNumberChange = (event) =>{
    setNewNumber (event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div className='search'><h3>Search</h3>
      <input type="search"value ={newSearch} onChange={handleSearchValue}/>
      {filteredPersons.map((per) =>(
        newSearch.length > 0 &&
        <Person name={per.name} number={per.phone} /> 
      ))}
      </div>
      <form onSubmit={addName}>
        <h3>Add New Entry</h3>
        <div>
          name: <input type="text" value = {newName} onChange = {handleNameChange} />
          <div>phone: <input type = "number" value={newNumber} onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit" > add </button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((per) =>(
        <Person key ={per.id}  name = {per.name} number={per.phone}/>
      ))}
    </div>
  )
}

export default App