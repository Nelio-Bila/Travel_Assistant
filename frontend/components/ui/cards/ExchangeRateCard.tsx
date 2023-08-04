import React from "react";

const ExchangeRateCard = ({ data }) => {
  const currencies: string[] = Object.keys(data.rates);
  const exchangeRates: number[] = Object.values(data.rates);

  return (
    <div className="card w-100 my-3">
      <div className="card-body">
        <h5 className="card-title">Exchange Rates for {data.base}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Date: {data.date}</h6>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Currency Code</th>
                {currencies.map((currency) => (
                  <th key={currency}>{currency}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Exchange Rate</th>
                {exchangeRates.map((rate) => (
                  <td key={rate}>{rate.toFixed(6)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
