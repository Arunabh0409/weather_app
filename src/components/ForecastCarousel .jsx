import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faWind,
  faTint,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const ForecastCarousel = ({ forecast, temperatureUnit }) => {
  const convertTemperature = (temp) => {
    return temperatureUnit === "Celsius" ? `${temp}°C` : `${temp}°F`;
  };

  const renderForecastCards = () => {
    const filteredForecast = forecast?.list
      ?.filter((item, index, array) => {
        const forecastDate = new Date(item.dt_txt);
        const currentDate = new Date();
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);
        tomorrowDate.setHours(0, 0, 0, 0);
        const nextForecastDate =
          index < array.length - 1 ? new Date(array[index + 1].dt_txt) : null;
        return (
          forecastDate > tomorrowDate &&
          forecastDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }) !==
            (nextForecastDate &&
              nextForecastDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }))
        );
      })
      .slice(0, 10);

    // We are Dividing forecast items into pairs
    const pairs = [];
    for (let i = 0; i < filteredForecast.length; i += 2) {
      pairs.push(filteredForecast.slice(i, i + 2));
    }

    // Mapping pairs to Carousel.Item components
    return pairs.map((pair, index) => (
      <Carousel.Item key={index}>
        <div className="row">
          {pair.map((item, idx) => (
            <div key={idx} className="col-md-6 mb-4">
              <div className="card bg-dark text-white p-3 rounded-lg shadow-md">
                <div className="card-body text-center">
                  <p className="text-lg font-semibold">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    {"  "}
                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-lg font-semibold">
                    <FontAwesomeIcon
                      style={{ color: "darkred" }}
                      icon={faThermometerHalf}
                    />{" "}
                    Temperature:{" "}
                    <span className="font-semibold">
                      {convertTemperature(item?.main?.temp)}
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    <FontAwesomeIcon
                      style={{ color: "#FFFF66" }}
                      icon={faTint}
                    />{" "}
                    Humidity:{" "}
                    <span className="font-semibold">
                      {item?.main?.humidity}%
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    <FontAwesomeIcon style={{ color: "blue" }} icon={faWind} />{" "}
                    Wind Speed:{" "}
                    <span className="font-semibold">
                      {item?.wind?.speed} m/s
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Carousel.Item>
    ));
  };

  return (
    <Carousel interval={null} indicators={false}>
      {renderForecastCards()}
    </Carousel>
  );
};

export default ForecastCarousel;
