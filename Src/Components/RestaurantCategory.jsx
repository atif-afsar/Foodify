import React from "react";
import { useState } from "react";
import ItemList from "./ItemList.jsx";


//its is controlled component because it is controlling the menu when it have its own state it does'nt have the controlled component
const RestaurantCategory = ({ data, showItems, setShowIdx}) => {

    const handleClick = () => {
        setShowIdx() 

    }

    
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-8/12 lg:w-6/12 bg-gray-100 shadow-lg p-6 m-4 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={handleClick}>
          <span className="font-bold text-xl text-gray-800">
            {data.title} ({data?.itemCards?.length})
          </span>
          <span className="text-lg">✅🍴</span>
        </div>

        {/* Items */}
       {showItems && <ItemList items={data.itemCards}  />}
      
      </div>
    </div>
  );
};

export default RestaurantCategory;
