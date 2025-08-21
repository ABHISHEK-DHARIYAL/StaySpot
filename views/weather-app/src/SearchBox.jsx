import { useState } from "react";
import "./SearchBox.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchBox({ updateInfo, initialCity = "" }) {
  let [city, setCity] = useState(initialCity);
  let [error, setError] = useState(false);
  const API_URL = process.env.Weather_API_URL;
  const API_KEY = process.env.Weather_API_KEY;

  let getWeatherInfo = async () => {
    try {
      let res = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonRes = await res.json();
      console.log(jsonRes);
      let result = {
        city: jsonRes.name,
        temp: jsonRes.main.temp,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        humidity: jsonRes.main.humidity,
        feelsLike: jsonRes.main.feels_like,
        weather: jsonRes.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };
  let handleChange = (evt) => {
    setCity(evt.target.value);
  };
  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      setCity("");
      let info = await getWeatherInfo();
      updateInfo(info);
      setCity("");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          className="InputForSearch"
          required
          onChange={handleChange}
          value={city}
          id="city"
          label="City Name"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              background: "rgba(255,255,255,0.2)",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, gold, royalblue)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              },
            },
          }}
        />{" "}
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No Such Place Exists.</p>}
      </form>
    </div>
  );
}
