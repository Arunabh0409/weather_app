import React from "react";
import { useState, useEffect } from "react";
import Cities_Json from "../Cities_Json.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";

//keyboard navigation
//dropdown using json
//string trim
//onKeyDown event handler.
//-1 initilise (mouse keyboard)
// add event listeners for the onKeyDown event on the input fiel -- onKeyDown={handleKeyDown}
//{/* i was doing city === "" wrong use trim function*/}

function SearchBar({
  weatherData,
  fetchWeatherData,
  toggleTemperatureUnit,
  temperatureUnit,
  errorinfo,
}) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const city_data = Cities_Json.cities.map((city) => city.City);

  const handleChange = (e) => {
    setCity(e.target.value);

    if (city.trim() === "") {
      setSuggestions([]); // If input is empty, clear suggestions
      setSelectedSuggestionIndex(-1);
      return;
    }

    const filteredSuggestions = city_data.filter((c) =>
      c.toLowerCase().startsWith(city.toLowerCase())
    );

    setSuggestions(filteredSuggestions.slice(0, 7)); // we are Limiting suggestions to the first 10 matches
    setSelectedSuggestionIndex(-1); // Reseting the selected suggestion index each time on handlechange
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
    setCity("");
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    fetchWeatherData(selectedCity);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      e.preventDefault();
      setCity(suggestions[selectedSuggestionIndex]);
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };
  useEffect(() => {
    document.getElementById("searchInput").focus(); // Focus on the input field when the component mounts or suggestions change
  }, [suggestions]);

  return (
    <>
      <div className="container mx-auto text-center mt-4">
        <h2 className="text-2xl font-bold mb-4">
          Welcome To The Weather Application ....
        </h2>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="d-flex align-items-center justify-content-center">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="form-control mr-2 border border-gray-300"
                  style={{ width: "calc(100% - 120px)", marginRight: "8px" }}
                />
                <button
                  type="submit"
                  className="btn btn-primary border border-dark"
                  style={{
                    minWidth: "120px",
                    color: "white",
                    borderColor: "black",
                  }}
                >
                  <FontAwesomeIcon icon={faReact} />
                  {"     "}
                  Search
                </button>
              </div>
            </form>

            {suggestions.length > 0 && city.trim() !== "" && (
              <ul className="list-group">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${
                      index === selectedSuggestionIndex ? "active" : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

            <div className="d-flex justify-content-center">
              <button
                onClick={toggleTemperatureUnit}
                className="btn btn-primary mt-3"
                disabled={errorinfo}
                style={{ minWidth: "120px", borderColor: "black" }}
              >
                Convert To{" "}
                {temperatureUnit === "Celsius" ? "Fahrenheit" : "Celsius"}
              </button>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
