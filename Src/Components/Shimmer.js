import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div key={index} className="shimmer-card bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="shimmer-img bg-gray-300 h-48 rounded-t-lg"></div>
            <div className="shimmer-lines p-4">
              <div className="shimmer-line bg-gray-300 h-4 rounded-md mb-3 w-3/4"></div>
              <div className="shimmer-line short bg-gray-300 h-4 rounded-md w-1/2"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
