import {useState} from 'react'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState ([
    {name: 'Arto Hellas'},{name: 'Tej Bahadur Gharti Kshetri',id:54,}
  ])
  const [newName, setNewName] = useState('')

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
      id:persons.length +1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log('added', persons)
  }
  const handleChange = (event) =>{
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input type="text" value = {newName} onChange = {handleChange} />
        </div>
        <div>
          <button type="submit" > add </button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((per) =>(
        <Person key ={per.id}  name = {per.name} />
      ))}
    </div>
  )
}

export default App