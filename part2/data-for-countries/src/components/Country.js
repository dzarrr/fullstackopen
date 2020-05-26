import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Weather from './Weather'

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

export default Country

