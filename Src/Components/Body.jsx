import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.jsx";
import RestaurantCard from "./RestaurantCard.jsx";
import { Link } from "react-router";
import useOnlineStatus from "../Utils/useOnlineStatus.jsx";
import { getMockRestaurantsResponse } from "../Utils/mockData.jsx";

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data instead of API call
      const json = getMockRestaurantsResponse();

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
          promoted: item.info.promoted || false,
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-red-500 font-semibold text-lg sm:text-xl max-w-md">
          <div className="text-4xl mb-4">📡</div>
          Looks like you're offline!! Please check your internet connection.
        </div>
      </div>
    );
  }

  if (isLoading) return <Shimmer />;

  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col justify-center items-center text-center text-white">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            Discover Your Favorite Food
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-medium drop-shadow-xl max-w-2xl sm:max-w-3xl mx-auto px-4">
            Find top-rated restaurants, fast delivery, and the best meals nearby.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <input
              className="w-full sm:w-1/2 px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-lg"
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
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 font-medium shadow-lg"
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
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200 font-medium shadow-lg"
            >
              Top Rated 🍽️
            </button>
          </div>
          
          {/* Clear Filter Button */}
          {filteredRestaurants.length !== listOfRestaurants.length && (
            <button
              onClick={() => {
                setFilteredRestaurants(listOfRestaurants);
                setSearchText("");
              }}
              className="text-emerald-200 hover:text-white transition-colors duration-200 text-sm underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Restaurants Grid */}
        <div className="w-full max-w-7xl mx-auto px-4">
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                  <RestaurantCard resData={restaurant} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300 text-lg sm:text-xl py-12">
              <div className="text-4xl mb-4">🍽️</div>
              No restaurants found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
