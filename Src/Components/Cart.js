import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../Utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items); // we use store.cart.items instead of just store for increasing the efficiency of our app 
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-xl">🛒 Your cart is empty!</p>
          <p className="text-sm mt-2">Add some delicious items to your cart!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Clear Cart Button */}
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-300"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items */}
          <ItemList items={cartItems} />
        </div>
      )}
    </div>
  );
};

export default Cart;
