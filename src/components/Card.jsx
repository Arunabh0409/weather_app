//was sending wrong prop for the temperature , eslie each time undefined was coming
// const pressure = current?.main?.pressue;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faWind,
  faTint,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";

const Card = ({ current, temperatureUnit }) => {
  const name = current?.name;
  const temperatureKelvin = current?.main?.temp;
  const humidity = current?.main?.humidity;
  const windSpeed = current?.wind?.speed;
  const weatherIconCode = current?.weather[0]?.icon;
  const pressure = current?.main?.pressure;

  const convertTemperature = (tempKelvin) => {
    if (temperatureUnit === "Celsius") {
      return (tempKelvin - 273.15).toFixed(2);
    } else {
      return (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(2);
    }
  };

  const getWeatherIconUrl = (code) => {
    switch (code) {
      case "01d":
        return "/icons/PARTIAL CLOUDY.png";
      case "01n":
        return "/icons/CLOUDY.png";
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return "/icons/CLOUDY.png";
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return "/icons/RAINY.png";
      case "11d":
      case "11n":
        return "/icons/THUNDERSTORM.png";
      case "13d":
      case "13n":
        return "/icons/RAIN AND SNOW.png";
      default:
        return "/icons/PARTIAL CLOUDY.png";
    }
  };

  const getWeatherCondition = (code) => {
    switch (code) {
      case "01d":
      case "01n":
        return "Clear Sky";
      case "02d":
      case "02n":
        return "Few Clouds";
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return "Cloudy";
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return "Rainy";
      case "11d":
      case "11n":
        return "Thunderstorm";
      case "13d":
      case "13n":
        return "Snowy";
      default:
        return "Sunny";
    }
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="col-md-12">
      <div className="card bg-dark text-white">
        <div className="card-body p-4" style={{ height: "320px" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5>{name}</h5>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={getWeatherIconUrl(weatherIconCode)}
                alt="Weather Icon"
                className="weather-icon img-fluid"
                style={{ maxWidth: "100px" }} // Adjust the width as needed
              />
            </div>
            <div>
              <h5>{currentTime}</h5>
            </div>
          </div>

          <div className="text-center mb-4">
            <div>
              <h6 className="display-4 mb-0 font-weight-bold">
                <strong>
                  {convertTemperature(temperatureKelvin)}
                  {temperatureUnit === "Celsius" ? "°C" : "°F"}
                </strong>
              </h6>
              {/* <br /> */}
              <span className="big" style={{ fontSize: "30px" }}>
                {getWeatherCondition(weatherIconCode)}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontSize: "1rem", textAlign: "center" }}>
              <div>
                <FontAwesomeIcon
                  style={{ color: "darkred" }}
                  icon={faThermometerHalf}
                  className="fa-fw"
                />
                <span className="ms-2">
                  Temperature: {convertTemperature(temperatureKelvin)}
                  {temperatureUnit === "Celsius" ? "°C" : "°F"}
                </span>
              </div>
              <br />
              <div>
                <FontAwesomeIcon
                  style={{ color: "#FFFF66" }}
                  icon={faCompress}
                  className="fa-fw"
                />
                <span className="ms-1">Pressure: {pressure} hPa</span>
              </div>
            </div>
            <div style={{ fontSize: "1rem", textAlign: "center" }}>
              <div>
                <FontAwesomeIcon
                  style={{ color: "#FFFF66" }}
                  icon={faTint}
                  className="fa-fw"
                />
                <span className="ms-1">Humidity: {humidity}%</span>
              </div>
              <br />
              <div>
                <FontAwesomeIcon
                  style={{ color: "blue" }}
                  icon={faWind}
                  className="fa-fw"
                />
                <span className="ms-1">Wind: {windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
