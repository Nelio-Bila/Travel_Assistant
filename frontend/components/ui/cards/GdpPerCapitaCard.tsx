import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCalendar,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const GdpPerCapitaCard = ({ data }) => {
  const gdpPerCapitaInfo = data[1][0];

  const gdpPerCapita = gdpPerCapitaInfo.value;
  const formattedGdp = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(gdpPerCapita);

  return (
    <div className="card w-100 my-2">
      <div className="card-header">GDP Per Capita Information</div>
      <div className="card-body">
        <h5 className="card-title">{gdpPerCapitaInfo.country.value}</h5>
        <p className="card-text">
          <FontAwesomeIcon icon={faDollarSign} /> GDP per Capita:{" "}
          <strong>{formattedGdp}</strong>
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faCalendar} /> Year: {gdpPerCapitaInfo.date}
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faChartBar} /> Indicator:{" "}
          {gdpPerCapitaInfo.indicator.value}
        </p>
      </div>
    </div>
  );
};

export default GdpPerCapitaCard;
