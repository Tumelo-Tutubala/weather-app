import { useState, useEffect } from "react"
import "./components/Forecast"
import "./components/SearchBar"
import "./components/WeatherCard"
import SearchBar from "./components/SearchBar"
import SearchResults from "./components/WeatherCard"
import WeatherCard from "./components/WeatherCard"



export default function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, isLoading] = useState(false)
  const [place, setPlace] = useState(null)

  async function searchCity(city) {
    isLoading(true)
    setError("")
    setWeather(null)
    setPlace(null)

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
    const geoData = await geoRes.json()
    if (!geoData.results) {
      setError("City not found")
      isLoading(false)
    }

    const place = geoData.results[0]

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m&timezone=auto`
    )
    const weatherData = await weatherRes.json()



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
      {error && <p>{error}</p>}

      {weather && (
        <>
          <WeatherCard weather={weather} place={place} />
          <Forecast daily={weather.daily} />
        </>
      )}
    </div>
  );

}