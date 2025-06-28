import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../Utils/cartSlice";

// Mock grocery data with specific food images
const mockGroceryItems = [
  {
    id: 1,
    title: "Fresh Bananas",
    imageId: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    aisle: "Fruits",
    price: 4500,
    rating: 4.5,
    description: "Fresh yellow bananas, perfect for smoothies and snacks"
  },
  {
    id: 2,
    title: "Organic Milk",
    imageId: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    aisle: "Dairy",
    price: 6500,
    rating: 4.3,
    description: "Pure organic milk, rich in calcium and vitamins"
  },
  {
    id: 3,
    title: "Whole Wheat Bread",
    imageId: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    aisle: "Bakery",
    price: 3500,
    rating: 4.2,
    description: "Fresh whole wheat bread, healthy and nutritious"
  },
  {
    id: 4,
    title: "Fresh Tomatoes",
    imageId: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
    aisle: "Vegetables",
    price: 2500,
    rating: 4.4,
    description: "Ripe red tomatoes, perfect for salads and cooking"
  },
  {
    id: 5,
    title: "Chicken Breast",
    imageId: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
    aisle: "Meat",
    price: 12000,
    rating: 4.6,
    description: "Fresh chicken breast, lean protein source"
  },
  {
    id: 6,
    title: "Brown Rice",
    imageId: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    aisle: "Grains",
    price: 8500,
    rating: 4.1,
    description: "Organic brown rice, high in fiber and nutrients"
  },
  {
    id: 7,
    title: "Greek Yogurt",
    imageId: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    aisle: "Dairy",
    price: 7500,
    rating: 4.7,
    description: "Creamy Greek yogurt, high in protein"
  },
  {
    id: 8,
    title: "Spinach Leaves",
    imageId: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    aisle: "Vegetables",
    price: 3000,
    rating: 4.3,
    description: "Fresh spinach leaves, rich in iron and vitamins"
  },
  {
    id: 9,
    title: "Almonds",
    imageId: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    aisle: "Nuts",
    price: 15000,
    rating: 4.8,
    description: "Premium almonds, healthy snack option"
  },
  {
    id: 10,
    title: "Olive Oil",
    imageId: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
    aisle: "Oils",
    price: 9500,
    rating: 4.4,
    description: "Extra virgin olive oil, heart-healthy cooking oil"
  },
  {
    id: 11,
    title: "Sweet Potatoes",
    imageId: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    aisle: "Vegetables",
    price: 4000,
    rating: 4.2,
    description: "Fresh sweet potatoes, rich in vitamins and fiber"
  },
  {
    id: 12,
    title: "Salmon Fillet",
    imageId: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    aisle: "Seafood",
    price: 18000,
    rating: 4.9,
    description: "Fresh salmon fillet, rich in omega-3 fatty acids"
  },
  {
    id: 13,
    title: "Quinoa",
    imageId: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    aisle: "Grains",
    price: 12000,
    rating: 4.5,
    description: "Organic quinoa, complete protein source"
  },
  {
    id: 14,
    title: "Avocados",
    imageId: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    aisle: "Fruits",
    price: 8000,
    rating: 4.6,
    description: "Ripe avocados, perfect for guacamole and salads"
  },
  {
    id: 15,
    title: "Cheddar Cheese",
    imageId: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
    aisle: "Dairy",
    price: 11000,
    rating: 4.3,
    description: "Sharp cheddar cheese, great for cooking and snacking"
  },
  {
    id: 16,
    title: "Broccoli",
    imageId: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop",
    aisle: "Vegetables",
    price: 3500,
    rating: 4.1,
    description: "Fresh broccoli, packed with vitamins and minerals"
  }
];

const FALLBACK_IMAGE_URL = "https://via.placeholder.com/400x300?text=Food+Image";

const Grocery = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setGroceryItems(mockGroceryItems);
      setFilteredItems(mockGroceryItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    const filtered = groceryItems.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleAddToCart = (item) => {
    // Create cart item in the format expected by ItemList component
    const cartItem = {
      card: {
        info: {
          id: item.id,
          name: item.title,
          price: item.price,
          defaultPrice: item.price,
          imageId: item.imageId,
          description: item.description
        }
      }
    };
    dispatch(addItem(cartItem));
    
    // Show success message
    alert(`${item.title} added to cart!`);
  };

  const getImageUrl = (item) => {
    return item.imageId || FALLBACK_IMAGE_URL;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-4">
            🛒 Grocery Store
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Fresh groceries delivered to your doorstep. Quality products, competitive prices.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Search for groceries..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-500">Loading fresh groceries...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-center sm:text-left">
              <p className="text-gray-600">
                Showing {filteredItems.length} of {groceryItems.length} items
              </p>
            </div>

            {/* Grocery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleAddToCart(item)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(item)}
                      alt={item.title}
                      onError={(e) => (e.target.src = FALLBACK_IMAGE_URL)}
                      className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {item.aisle}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors duration-200">
                      {item.title}
                    </h4>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                        <span>⭐</span>
                        {item.rating}
                      </span>
                      <span className="text-green-600 font-bold text-lg sm:text-xl">
                        ₹{(item.price / 100).toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <button
                      className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm group-hover:shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-lg text-gray-500 mb-2">No groceries found</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Grocery;
