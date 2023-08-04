import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faThermometerHalf,
  faTachometerAlt,
  faTint,
  faWind,
  faCloud,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ data }) => {
  return (
    <div className="card w-100 my-2">
      <div className="card-header">Weather in {data.name}</div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          {data.weather[0].description}
        </h6>

        <div className="row">
          <div className="col-md-6">
            <p className="card-text">
              <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature:{" "}
              {data.main.temp} °C
            </p>
            <p className="card-text">
              <FontAwesomeIcon icon={faThermometerHalf} /> Feels Like:{" "}
              {data.main.feels_like} °C
            </p>
            <p className="card-text">
              <FontAwesomeIcon icon={faTachometerAlt} /> Pressure:{" "}
              {data.main.pressure} hPa
            </p>
          </div>
          <div className="col-md-6">
            <p className="card-text">
              <FontAwesomeIcon icon={faTint} /> Humidity: {data.main.humidity}%
            </p>
            <p className="card-text">
              <FontAwesomeIcon icon={faWind} /> Wind Speed: {data.wind.speed}{" "}
              m/s
            </p>
            <p className="card-text">
              <FontAwesomeIcon icon={faCloud} /> Cloudiness: {data.clouds.all}%
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="card-text">
              <FontAwesomeIcon icon={faSun} /> Sunrise:{" "}
              {new Date(data.sys.sunrise * 1000).toLocaleTimeString("pt-MZ")}
            </p>
          </div>
          <div className="col-md-6">
            <p className="card-text">
              <FontAwesomeIcon icon={faMoon} /> Sunset:{" "}
              {new Date(data.sys.sunset * 1000).toLocaleTimeString("pt-MZ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
