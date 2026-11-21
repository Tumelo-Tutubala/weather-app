import { useState, useEffect } from "react"
import Forecast from "./components/Forecast"
import SearchBar from "./components/SearchBar"
import SearchResults from "./components/WeatherCard"
import WeatherCard from "./components/WeatherCard"
import "./App.css"



export default function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, isLoading] = useState(false)
  const [place, setPlace] = useState(null)

  async function searchCity(city) {

    if (!city.trim()) {
  setError("Please enter a city name")
  return
}
    isLoading(true)
    setError("")
    setWeather(null)
    setPlace(null)

      try {
    // ...your fetch code, including the results check
  } catch (err) {
    setError("Something went wrong. Check your connection.")
  } finally {
    isLoading(false)
  }


    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
    const geoData = await geoRes.json()
    if (!geoData.results) {
      setError("City not found")
      isLoading(false)
      return
    }

    const place = geoData.results[0]

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    )
    const weatherData = await weatherRes.json()
console.log(weatherData.daily)


    setWeather(weatherData)
    setPlace(place)
    isLoading(false)
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar
        onSearch={searchCity}
      />

      {loading && <p>Loading...</p>}

<div className="error-banner" >
  <strong></strong>{error && <p className="error">{error}</p>}
</div>

      {weather && (
        <>
          <WeatherCard weather={weather} place={place} />
          <Forecast daily={weather.daily} />
        </>
      )}
    </div>
  );

}