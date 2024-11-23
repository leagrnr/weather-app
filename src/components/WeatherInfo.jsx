import React from "react";

const WeatherInfo = ({ weatherData }) => {
    if (!weatherData) return null;

    const { temperature, windspeed } = weatherData;

    return (
        <div className="card">
            <h2>Météo actuelle</h2>
            <p><strong>Température :</strong> {temperature}°C</p>
            <p><strong>Vent :</strong> {windspeed} km/h</p>
        </div>
    );
};

export default WeatherInfo;
