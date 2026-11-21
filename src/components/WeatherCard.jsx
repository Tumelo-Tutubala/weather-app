export default function WeatherCard({weather,place}){




    return(
    <div className="WeatherCard">
        <p>Country : {place.country}</p>
        <p>City : {place.name}</p>
         <p>Temperature: {weather.current.temperature_2m}°C</p>
      <p>Wind: {weather.current.wind_speed_10m} km/h</p>
    </div>
);
}