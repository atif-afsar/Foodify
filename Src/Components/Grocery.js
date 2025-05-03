import { useEffect, useState } from "react";

const API_KEY = "bc15e24824b2468c8c4698171bb8d395";
const FALLBACK_IMAGE_URL = "https://via.placeholder.com/150?text=No+Image+Available";

const Grocery = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGroceryData();
  }, []);

  const fetchGroceryData = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/products/search?query=groceries&number=20&apiKey=${API_KEY}`
      );
      const data = await response.json();
      if (data?.products) {
        setGroceryItems(data.products);
        setFilteredItems(data.products);
      }
    } catch (error) {
      console.error("Error fetching grocery data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = groceryItems.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const getImageUrl = (item) => {
    return item.image || FALLBACK_IMAGE_URL;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">🛒 Grocery Store</h1>

      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search for groceries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading groceries...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={getImageUrl(item)}
                alt={item.title}
                onError={(e) => (e.target.src = FALLBACK_IMAGE_URL)}
                className="w-full h-40 object-contain mb-4 rounded-md bg-gray-50"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-600 mb-1">
                🛍 <span className="font-medium">Category:</span> {item.aisle || "General"}
              </p>
              <p className="text-gray-600">
                ⭐ <span className="font-medium">Rating:</span> {(Math.random() * 2 + 3).toFixed(1)} / 5
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grocery;
