import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { MENU_API } from "../Utils/constants";
const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const {resId}  = useParams();
  
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
    MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();

    const resData = json?.data;
    setResInfo(resData);

    // Find the "REGULAR" section
    const regularCards =
      resData?.cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    // Extract all menu itemCards from relevant cards
    const allItemCards = regularCards
      .filter(
        (card) =>
          card?.card?.card?.itemCards &&
          card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
      .flatMap((card) => card.card.card.itemCards);

    setMenuItems(allItemCards);
  };

  if (!resInfo) return <Shimmer />;

  // Get restaurant info safely
  const resCard = resInfo?.cards?.find(
    (c) => c?.card?.card?.info
  );
  const { name, cuisines, costForTwo } = resCard?.card?.card?.info || {};

  return (
    <div className="Menu">
      <h1>{name}</h1>
      <h3>{cuisines?.join(", ")} - ₹{costForTwo / 100}</h3>

      <h1>Menu</h1>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => {
            const info = item?.card?.info;
            return (
              <li key={index}>
                <h4>
                  {info?.name} - ₹
                  {(info?.price || info?.defaultPrice) / 100}
                </h4>
              </li>
            );
          })
        ) : (
          <li>No menu items found</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
