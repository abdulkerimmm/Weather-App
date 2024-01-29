import React, { useState, useEffect } from "react";
import "./weather.css";

function Weather() {
  const todayDate = new Date();
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [erorMsg, setErrorMsg] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const iconURL = "http://openweathermap.org/img/w/";
  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: "28fd15358cdecbc1a1dfef367e71acef",
  };

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherInfo = (e) => {
    if (e.key === "Enter" && input === "") {
      setIsShow(true);
      setErrorMsg("please Write something ");
    }

    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setIsShow(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to Fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          setWeather(data);
          setInput("");
          setIsShow(false);
          setIsLoading(false);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="bigBox">
      <div className="secondBox">
        <h1 className="mainHead">Wheather App</h1>
        <p className="todayDate">{todayDate.toLocaleDateString()}</p>
        <input
          onKeyPress={getWeatherInfo}
          onChange={getInput}
          value={input}
          placeholder="Search City Name"
        />
        {isShow ? (
          <p style={{ color: "white" }}>{erorMsg}</p>
        ) : (
          <>
            <div className="informationCity">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp: {Math.round(weather.main.temp)}°C</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>
                Temp Range: {Math.round(weather.main.temp_min)}°C /{" "}
                {Math.round(weather.main.temp_max)}°C
              </p>
            </div>
          </>
        )}
        {isLoading && <h3 style={{ color: "white" }}> loading... </h3>}
      </div>
    </div>
  );
}

export default Weather;
