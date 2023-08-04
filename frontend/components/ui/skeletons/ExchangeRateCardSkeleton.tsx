import React from "react";

const ExchangeRateCardSkeleton = () => {
  return (
    <div className="card w-100 my-3">
      <div className="card-body">
        <h5 className="card-title">
          <div className="skeleton-text"></div>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <div className="skeleton-text"></div>
        </h6>
        <div className="table-responsive">
          <table className="table table-bordered">
            <>
              <thead>
                <tr>
                  <th>
                    <div className="skeleton-text"></div>
                  </th>
                  <th>
                    <div className="skeleton-text"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div className="skeleton-text"></div>
                  </th>
                  <td>
                    <div className="skeleton-text"></div>
                  </td>
                </tr>
              </tbody>
            </>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateCardSkeleton;
