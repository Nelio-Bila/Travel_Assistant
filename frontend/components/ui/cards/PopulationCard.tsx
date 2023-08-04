import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faCalendar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const PopulationCard = ({ data }) => {
  const populationInfo = data[1][0];
  const population = populationInfo.value;
  const formattedPopulation = new Intl.NumberFormat("en-US").format(population);

  return (
    <div className="card w-100 my-2">
      <div className="card-header">Population Information</div>
      <div className="card-body">
        <h5 className="card-title">{populationInfo.country.value}</h5>
        <p className="card-text">
          <FontAwesomeIcon icon={faUsers} /> Population:{" "}
          <strong>{formattedPopulation}</strong>
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faGlobe} /> Country ID:{" "}
          {populationInfo.country.id}
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faCalendar} /> Year: {populationInfo.date}
        </p>
      </div>
    </div>
  );
};

export default PopulationCard;
