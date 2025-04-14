import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch restaurant data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from Swiggy API
  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.1774553&lng=78.0077653&offset=0&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const json = await data.json();

      const restaurantCard = json?.data?.cards?.find((card) => {
        return card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      });

      const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (restaurants && Array.isArray(restaurants)) {
        const formattedRestaurants = restaurants.map((item) => ({
          id: item.info.id,
          name: item.info.name,
          imageId: item.info.cloudinaryImageId,
          avgRating: item.info.avgRating,
          cuisines: item.info.cuisines,
          deliveryTime: `${item.info.sla.deliveryTime} mins`,
        }));

        setListOfRestaurants(formattedRestaurants);
        setFilteredRestaurants(formattedRestaurants);
      } else {
        console.warn("⚠️ No restaurants found.");
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Shimmer />;

  return (
    <div className="body">
      <div className="search-section">
        <input
          className="search-box"
          type="text"
          placeholder="Search for delicious food..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => {
            const filtered = listOfRestaurants.filter((res) =>
              res.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurants(filtered);
          }}
        >
          Search Food
        </button>
      </div>

      <button
        className="filter-btn"
        onClick={() => {
          const topRated = listOfRestaurants.filter((res) => res.avgRating > 4);
          setFilteredRestaurants(topRated);
        }}
      >
        Top Rated Restaurants
      </button>

      <div className="restaurants-container">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.id} to={"/restaurants/" + restaurant.id }> <RestaurantCard  resData={restaurant} />
          </Link> 
          ))
        ) : (
          <div>No restaurants found.</div>
        )}
      </div>
    </div>
  );
};

export default Body;
