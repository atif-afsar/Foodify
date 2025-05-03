import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { CDN_URL } from "../Utils/constants";


const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
       CDN_URL
      );
      const json = await data.json();

      const restaurantCard = json?.data?.cards?.find((card) =>
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (restaurants && Array.isArray(restaurants)) {
        const formatted = restaurants.map((item) => ({
          id: item.info.id,
          name: item.info.name,
          imageId: item.info.cloudinaryImageId,
          avgRating: item.info.avgRating,
          cuisines: item.info.cuisines,
          deliveryTime: `${item.info.sla.deliveryTime} mins`,
          promoted: item.info.promoted || false, // Ensure promoted is safely set
        }));

        setListOfRestaurants(formatted);
        setFilteredRestaurants(formatted);
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold text-xl">
        Looks like you're offline!! Please check your internet connection.
      </div>
    );
  }

  if (isLoading) return <Shimmer />;

  return (
    <div className="relative">
      {/* Dark Overlay for Better Text Visibility */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-8 py-10 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-2xl">
          Discover Your Favorite Food
        </h1>
        <p className="text-lg sm:text-xl mb-8 font-medium drop-shadow-2xl max-w-3xl mx-auto">
          Find top-rated restaurants, fast delivery, and the best meals nearby.
        </p>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 w-full max-w-4xl mx-auto">
          <input
            className="w-full md:w-1/2 px-5 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            type="text"
            placeholder="Search for delicious food..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
            className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
          >
            Search
          </button>
          <button
            onClick={() => {
              const topRated = listOfRestaurants.filter(
                (res) => res.avgRating > 4
              );
              setFilteredRestaurants(topRated);
            }}
            className="px-6 py-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          >
            Top Rated 🍽️
          </button>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl mx-auto">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                
                  <RestaurantCard resData={restaurant} />
              
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No restaurants found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
