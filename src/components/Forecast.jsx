export default function Forecast({ daily }) {
    return (
        <div className="Forecast">
            {daily.time.map((date, i) => (
                <div key={date} className="ForecastDay">
                    <p>{new Date(date).toLocaleDateString("en-ZA", { weekday: "short" })}</p>
                    <p>High: {daily.temperature_2m_max[i]}°C</p>
                    {/* Low and rain chance: your turn */}
                </div>
            ))}
        </div>
    );
}