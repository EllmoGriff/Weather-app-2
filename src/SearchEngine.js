import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [message, setMessage] = useState("");
  let [temperature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (city.length > 0) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d68aadfacdd4f5163bc273049a0cf2d&units=Metric`;
      axios.get(url).then(showTemperature);
      setMessage(
        <ul className="showTemperature">
          <li>{city}</li>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Description: {description}</li>
          <li>Humidity:{humidity}%</li>
          <li>Wind:{Math.round(wind)}km/h </li>
          <li>
            {" "}
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt="Weather icons"
            />
          </li>
        </ul>
      );
    } else {
      setMessage(`Please Enter a City`);
    }

    function showTemperature(response) {
      setTemperature(response.data.main.temp);
      setDescription(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
      // console.log(response.data);
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  return (
    <div className="searchEngine">
      <form onSubmit={handleSubmit}>
        {" "}
        <input type="search" onChange={updateCity} placeholder="Where to?" />
        <input type="submit" value="search" id="searchButton" />
      </form>
      <h2>{message}</h2>
    </div>
  );}