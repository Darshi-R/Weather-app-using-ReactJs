import React, {useState} from "react";
import axios from "axios";

    export default function Weather() {
  let [climate, setClimate] = useState("");
  let [details, setDetails] = useState([]);
  let [city, setCity] = useState(false);

  function showTemperature(response) {
    setCity(true);
    setDetails({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      image: `http://openweathermap.org/img/wn/01d@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
      if (climate){
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${climate}&appid=3e9bf67ecf247b8b42e8d798f8757586&units="metric"`;
      axios.get(url).then(showTemperature);
      }
      else {
        alert("Please enter city name!!!")
      }
     
  }

  function updateCity(event) {
    event.preventDefault();
    setClimate(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <h1>Weather App</h1>
      <input
        type="search"
        placeholder="Type a name of the City"
        autoComplete="off"
        onChange={updateCity}
      />{" "}
      <input type="submit" name="search" placeholder="Search" />
    </form>
  );
  let weatherDetails = (
    <div>
      <h3> {climate} </h3>
      <img src={details.image} alt=" Today's weather" />
      <ul>
        <li> Temperature : {details.temperature}° C</li>
        <li> Description : {details.description}</li>
        <li> Humidity : {details.humidity} grams per cubic meter</li>
        <li> Wind : {details.wind} mph</li>
      </ul>
    </div>
  );
  if (city) {
    return (
      <div>
        {form}
        {weatherDetails}
      </div>
    );
  } else {
    return form;
  }
}
