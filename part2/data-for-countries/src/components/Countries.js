import React from 'react'
import Country from './Country'

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

export default Countries