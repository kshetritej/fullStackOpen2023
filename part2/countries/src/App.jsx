import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [geographic, setGeographic] = useState(null);

  const getCountries = () => {
    if (countries) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          const data = response.data;
          console.log("response:", data);
          setCountries(data);
        })
        .finally(console.log("data fething complete.."));
    }
  };

  useEffect(() => {
    console.log("fetching..."), getCountries();
  }, []);

  const getSearchedCountries = () => {
    const filteredCountries = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setSearchResult(filteredCountries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search term is:", searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    getSearchedCountries();
    console.log("filteredCountries:", searchResult);
  };

  const onShowDetails = (item) => {
    console.log(item.toLowerCase());
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${item.toLowerCase()}`
      )
      .then((res) => {
        setGeographic(res.data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button type="submit"> Search </button>
      </form>

      <div className="results">
        {searchResult.length > 10 ? (
          <div>too many matches</div>
        ) : searchResult.length === 1 ? (
          <ul>
            {searchResult.map((item) => {
              return (
                <>
                  <h1>{item.name.common}</h1>
                  <li key={item.capital}>Capital: {item.capital}</li>
                  <li key={item.area}>Area: {item.area}</li>
                  <h2>Languages</h2>
                  {Object.entries(item.languages).map(([key, value]) => {
                    return <li key={key}>{value}</li>;
                  })}

                  <h2>Flag</h2>
                  {
                    <img
                      src={item.flags.png}
                      alt={`${item.name.common}-flag`}
                    />
                  }
                  <br />
                  {item.flags.png}
                </>
              );
            })}
          </ul>
        ) : (
          <div>
            {searchResult.map((item) => (
              <>
                <div key={item.tld} style={{ display: "flex", gap: 10 }}>
                  <li key={item.name.common}>{item.name.common}</li>
                  {/* <button
                    key={`${item.name.common}-button`}
                    onClick={()=>axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${item.name.common.toLowerCase()}`).then(res =>{
                      const d = res.data;
                      console.log(d);
                    })}
                  > */}
                  <button
                    onClick={() => {
                      onShowDetails(item.name.common);
                    }}
                  >
                    Details
                  </button>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      {geographic && (
        <div>
          <ul>
            <h1>{geographic.name.common}</h1>
            <li key={geographic.capital}>Capital: {geographic.capital}</li>
            <li key={geographic.area}>Area: {geographic.area}</li>
            <h2>Languages</h2>
            {Object.entries(geographic.languages).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
            <h2>Flag</h2>
            <img
              src={geographic.flags.svg}
              alt={`${geographic.name.common}-flag`}
            />
            <br />
            {geographic.flags.png}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
