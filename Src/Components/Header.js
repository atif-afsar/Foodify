import { useContext, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LOGO_URL from "../Utils/constants";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { UserContext } from "../Utils/UserContext";
import AuthModal from "./AuthModal"; // 🔹 Import the modal

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart?.items) || [];

  return (
    <header className="bg-emerald-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img src={LOGO_URL} alt="Logo" className="w-28 sm:w-36 object-contain" /> 
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-base lg:text-lg font-medium">
          <Link to="/" className="hover:text-emerald-200">Home</Link>
          <Link to="/about" className="hover:text-emerald-200">About</Link>
          <Link to="/contact" className="hover:text-emerald-200">Contact</Link>
          <Link to="/grocery" className="hover:text-emerald-200">Grocery</Link>
          <Link to="/cart" className="relative hover:scale-110 transition-transform">
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-7 h-7" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Login Button */}
        <div className="flex items-center gap-4 text-sm lg:text-base">
          <span>Online: {onlineStatus ? "✅" : "🔴"}</span>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-100 transition"
          >
            Login
          </button>
          <ul>
            <li className="px-4">{loggedInUser}</li>
          </ul>
        </div>
      </div>

      {/* 🔹 Auth Modal Rendered */}
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
};

export default Header;
