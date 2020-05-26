import React from 'react'

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

export default Weather