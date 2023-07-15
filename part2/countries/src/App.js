import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState ([])


  useEffect(() => {
    console.log(`..fetching`)
    if (countries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(`error getting data (axios error maybe)`)
        })
    }
  }, [countries])

  useEffect(()=>{
    const filteredCountries = countries.filter(country => {
      const lowercaseCountryName = country.name.toLowerCase()
      return lowercaseCountryName.includes(searchTerm.toLowerCase())
    })
    setSearchResults(filteredCountries)
  }, [searchTerm, countries])

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const onSearch = (event) =>{
    event.preventDefault()
    setCountries(searchTerm)
  }

  return (
    <>
    <form onSubmit = {onSearch} >
      find countries <input type='search' value={searchTerm} onChange={handleChange} />
      <button type='submit'>Search</button>
    </form>
      <div>
        {searchResults.map(country => (
          <div key = {country.alpha3Code}>
            {country.name}
            </div>
        ))}

      </div>
    </>
  )
}

export default App