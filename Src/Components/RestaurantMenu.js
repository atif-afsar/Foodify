import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../Utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showIdx, setShowIdx] = useState(null); // controls which category is open

  useEffect(() => {
    if (resInfo) {
      const regularCards =
        resInfo?.cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const filteredCategories = regularCards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      const allItemCards = filteredCategories.flatMap(
        (card) => card.card.card.itemCards || []
      );

      setMenuItems(allItemCards);
      setCategories(filteredCategories); // ✅ this was missing before
    }
  }, [resInfo]);

  if (!resInfo) return <Shimmer />;

  // Extract restaurant info
  const resCard = resInfo?.cards?.find((c) => c?.card?.card?.info);
  const { name, cuisines, costForTwo } = resCard?.card?.card?.info || {};

  return (
    <div className="Menu p-8 bg-gray-50 min-h-screen">
      {/* Restaurant Info Section */}
      <div className="restaurant-info text-center mb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 tracking-wide mb-4">
          🍴 {name}
        </h1>
        <h3 className="text-lg sm:text-xl text-gray-500 font-medium">
          {cuisines?.join(", ")}
        </h3>

        {/* Welcome Text Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-green-600 text-center mb-4">
            Indulge in the Finest Flavors ✨
          </h2>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            Starting at just{" "}
            <span className="text-green-600 font-semibold">
              ₹{(costForTwo / 2) / 100}
            </span>
            , our dishes are crafted to delight your taste buds.
          </p>
          <p className="text-md text-gray-600 text-center mt-3">
            Whether you're craving a quick bite or a family feast, we’ve got
            something delicious for everyone.
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Explore Our Menu
      </h2>

      {categories.map((category, idx) => (
        <RestaurantCategory
          key={idx}
          data={category?.card?.card}
          showItems={idx === showIdx}
          setShowIdx={() => setShowIdx(showIdx === idx ? null : idx)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
