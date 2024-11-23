import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import WeatherMap from "./components/WeatherMap";

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [city, setCity] = useState("");

    const fetchWeather = async (cityName) => {
        try {
            const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: cityName,
                    format: "json",
                },
            });
            if (geoResponse.data.length === 0) {
                alert("Ville non trouvée !");
                return;
            }
            const { lat, lon } = geoResponse.data[0];
            setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
            setCity(cityName);
            const weatherResponse = await axios.get(
                `https://api.open-meteo.com/v1/forecast`,
                {
                    params: {
                        latitude: lat,
                        longitude: lon,
                        current_weather: true,
                    },
                }
            );
            setWeatherData(weatherResponse.data.current_weather);
        } catch (error) {
            console.error("Erreur lors de la récupération des données météo", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <div className="container">
            <SearchBar onSearch={fetchWeather} />
            <WeatherInfo weatherData={weatherData} />
            <WeatherMap
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                city={city}
            />
        </div>
    );
};

export default App;
