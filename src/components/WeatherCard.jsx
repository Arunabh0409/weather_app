//used optional chaining to avoid errors as of now , when getting data from api
//Font Awesome CDN used for card and icons , could have used material ui also
//npm i also do for this package ( @fontawesome )

//toggle F/C
// temperatureUnit state variable is used to track the current temperature unit.
// toggleTemperatureUnit function toggles between Celsius and Fahrenheit and updates the temperature values accordingly.
// convertToFahrenheit and convertToCelsius functions are used to convert temperature values between Celsius and Fahrenheit.
// You need to integrate this functionality into your existing components and handle the conversion for both current weather and forecast data.

//weather current

import React from "react";
import Card from "./Card";
import ForecastCarousel from "./ForecastCarousel ";

const WeatherCard = ({ weatherData, temperatureUnit }) => {
  const { current, forecast } = weatherData;
  return (
    <>
      <div
        className="container mt-5"
        style={{
          border: "none",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-ms-6 col-lg-5">
            <Card temperatureUnit={temperatureUnit} current={current} />{" "}
          </div>

          <div
            className="col-md-6 col-lg-7"
            style={{
              border: "none",
            }}
          >
            <div
              className="card "
              style={{
                backgroundColor: "transparent",
                margin: 0,
                padding: 0,
                border: "none",
              }}
            >
              <div className="card-body" style={{ border: "none" }}>
                <h4 className="card-title text-lg font-semibold mb-3 text-center">
                  Next 5 Days Forecast {current?.name}.....
                </h4>
                <ForecastCarousel
                  forecast={forecast}
                  temperatureUnit={temperatureUnit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
