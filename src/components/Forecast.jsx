export default function Forecast({ daily }) {
    return (
        <div className="Forecast">
            {daily.time.map((date, i) => (
                <div key={date} className="ForecastDay">
                    <p>{new Date(date).toLocaleDateString("en-ZA", { weekday: "short" })}</p>
                    <p>High: {daily.temperature_2m_max[i]}°C</p>
                    <p>Low: {daily.temperature_2m_min[i]}°C</p>
                    <p>Rain: {daily.precipitation_probability_max[i]}%</p>

                </div>
            ))}
        </div>
    );
}