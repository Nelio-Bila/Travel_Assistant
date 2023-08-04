import React from "react";

const GdpPerCapitaCardSkeleton = () => {
  return (
    <div className="card w-100 my-2">
      <div className="card-header">
        <div className="skeleton-text"></div>
      </div>
      <div className="card-body">
        <div className="skeleton-loader">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    </div>
  );
};

export default GdpPerCapitaCardSkeleton;
