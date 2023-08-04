import React from "react";

const WeatherCardSkeleton = () => {
  return (
    <div className="card w-100 my-2">
      <div className="card-header">
        <div className="skeleton-text"></div>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          <div className="skeleton-text"></div>
        </h6>

        <div className="row">
          <div className="col-md-6">
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="col-md-6">
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="skeleton-text"></div>
          </div>
          <div className="col-md-6">
            <div className="skeleton-text"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
