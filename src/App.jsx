import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import BackgroundSunnyPic from "../public/icons/bgsunnypic.png";

//ERR_TIMED_OUT error getting onn the weather api , taking longer time as expected
//in this api call , there was no https(always check api )
// weatherData.current = currentWeatherResponse.data; //one mistake i was doing ki .data mai mera data hoga not in the axios response

function App() {
  const [weatherData, setWeatherData] = useState(null); // Initial state set to null
  const [error, setError] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"
    );
  };

  const fetchWeatherData = async (city) => {
    try {
      const coordinates = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=Metric&appid=73f50467e579918488b10da1de9909aa`
      );

      const longitude = coordinates.data[0].lon;
      const latitude = coordinates.data[0].lat;

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=73f50467e579918488b10da1de9909aa`
      );

      const weatherForcast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=73f50467e579918488b10da1de9909aa`
      );

      setWeatherData({
        current: currentWeatherResponse.data,
        forecast: weatherForcast.data,
      });

      setError(null);
    } catch (err) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData("Jaipur");
  }, []);

  return (
    <>
      <div
        className="app-container"
        style={{
          border: "1px solid transparent",
          backgroundImage: `url(${BackgroundSunnyPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        {/*component content */}
        <div className="bg-blue mt-10">
          <div className="container bg-red mx-auto px-4 py-8">
            <SearchBar
              weatherData={weatherData}
              errorinfo={error}
              toggleTemperatureUnit={toggleTemperatureUnit}
              temperatureUnit={temperatureUnit}
              fetchWeatherData={fetchWeatherData}
            />
            {error && <ErrorMessage message={error} />}
            {weatherData && (
              <>
                <WeatherCard
                  temperatureUnit={temperatureUnit}
                  weatherData={weatherData}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
