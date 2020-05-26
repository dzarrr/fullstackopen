import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const Weather = ({capital, weatherInfo}) => {
  return (
    <div>
      <h2>weather in {capital}</h2>
      <div>
        <div>
          <span><strong>temperature:</strong>{` ${weatherInfo.temperature}`} Celcius</span>
          <br></br>
          <img src={weatherInfo.weather_icons ? weatherInfo.weather_icons[0] : ""} alt=""/>
          <br></br>
          <span>
            <strong>wind:</strong>
            {` ${weatherInfo.wind_speed} mph direction ${weatherInfo.wind_dir}`}
          </span>
        </div>
      </div>
    </div>
  )
}

const Country = (props) => {
  const [weatherInfo, setWeatherInfo] = useState({})
  const { name, capital, population, languages, flag } = props

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
      .then(response => {
        setWeatherInfo(response.data.current)
      })
  }, [])

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <p>capital {capital}</p>
        <br></br>
        <p>population {population}</p>
      </div>
      <h2>languages</h2>
      <ul>
        {languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={flag} alt=""/>
      <Weather capital={capital} weatherInfo={weatherInfo} />
    </div>
  )
}


const Countries = ({onShowButtonClick, countries}) => {
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
          <div key={country.name}>
            <p>
              {country.name}
            </p>
            <button onClick={() => onShowButtonClick(country)}>
              show
            </button>
          </div>
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
