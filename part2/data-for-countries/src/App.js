import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'
import Countries from './components/Countries'

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

  const onShowButtonClick = (country) => {
    setSearch(country.name)
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
      <Countries
        onShowButtonClick={onShowButtonClick}
        countries={getFilteredCountries(countries, search)}
      />
    </div>
  )
}

export default App;
