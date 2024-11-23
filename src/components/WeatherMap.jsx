import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";

const customIcon = divIcon({
    className: "custom-div-icon",
    html: `<div class="fa-marker-icon">
           <i class="fa-solid fa-location-dot" style="color: #4CAF50; font-size: 24px;"></i>
         </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const CenterMap = ({ latitude, longitude }) => {
    const map = useMap();
    useEffect(() => {
        if (latitude && longitude) {
            map.setView([latitude, longitude], 10);
        }
    }, [latitude, longitude, map]);
    return null;
};

const WeatherMap = ({ latitude, longitude, city }) => {
    if (!latitude || !longitude) return null;

    return (
        <div className="map-container card">
            <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]} icon={customIcon}>
                    <Popup>{city}</Popup>
                </Marker>
                <CenterMap latitude={latitude} longitude={longitude} />
            </MapContainer>
        </div>
    );
};

export default WeatherMap;