import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList.jsx";
import { clearCart } from "../Utils/cartSlice.jsx";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.card?.info?.price || item.card?.info?.defaultPrice || 0;
      return total + price;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-4">
            🛒 Your Cart
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Review your items and proceed to checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl sm:text-8xl mb-6">🛒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-md mx-auto">
              Add some delicious items to your cart to get started with your order.
            </p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a
                href="/"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Browse Restaurants
              </a>
              <a
                href="/grocery"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Shop Groceries
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Cart Summary
                  </h2>
                  <p className="text-gray-600">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                      ₹{(getTotalPrice() / 100).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Your Items
                </h3>
              </div>
              <ItemList items={cartItems} />
            </div>

            {/* Checkout Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    Ready to order?
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Your items will be prepared fresh and delivered to your doorstep.
                  </p>
                </div>
                <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 sm:py-4 rounded-lg transition-colors duration-200 font-medium shadow-lg text-lg">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
