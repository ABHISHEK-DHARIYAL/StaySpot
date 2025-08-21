import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState } from "react";

export default function WeatherApp({ location }) {
  const [weatherInfo, setWeatherInfo] = useState({
    city: location || "Delhi",
    feelsLike: 37.41,
    humidity: 32.41,
    temp: 32.41,
    tempMax: 32.41,
    tempMin: 32.41,
    weather: "haze",
  });
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div
      className="weather-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ABE2 0%, #5563DE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "30px",
          textShadow: "2px 4px 10px rgba(0,0,0,0.3)",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        🌤 Weather App
      </h2>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          width: "90%",
          maxWidth: "420px",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div style={{ marginBottom: "20px" }} className="weather-box">
          <SearchBox updateInfo={updateInfo} initialCity={location} />
        </div>
        <InfoBox info={weatherInfo} />
      </div>
    </div>
  );
}
