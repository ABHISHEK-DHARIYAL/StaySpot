import "./App.css";
import WeatherApp from "./WeatherApp.jsx";

function App({ location }) {
  return (
    <>
      <WeatherApp location={location} />
    </>
  );
}

export default App;
