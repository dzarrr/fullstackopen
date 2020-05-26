import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const Country = (props) => {
  const { name, capital, population, languages, flag } = props
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <p>capital {capital}</p>
        <p>population {population}</p>
      </div>
      <h2>languages</h2>
      <ul>
        {languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={flag} alt=""/>
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <Country
        name={country.name}
        capital={country.capital}
        population={country.population}
        languages={country.languages}
        flag={country.flag}
      />
    )
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if ((countries.length > 1) && (countries.length <= 10)){
    return (
      <div>
        {countries.map(country =>
          <p key={country.name}>
            {country.name}
          </p>
        )}
      </div>
    )
  }
  return <div></div>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const getFilteredCountries = (countries, search) =>
    countries.filter(country =>
      country.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
      <div>
        find countries
        <input type="text" onChange={handleSearchChange} />
      </div>
      <Countries countries={getFilteredCountries(countries, search)} />
    </div>
  )
}

export default App;
