import { useContext, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LOGO_URL from "../Utils/constants.jsx";
import useOnlineStatus from "../Utils/useOnlineStatus.jsx";
import { UserContext } from "../Utils/UserContext.jsx";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { user, logout } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart?.items) || [];

  return (
    <header className="bg-emerald-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={LOGO_URL} alt="Logo" className="w-24 sm:w-28 md:w-32 lg:w-36 object-contain" /> 
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-base xl:text-lg font-medium">
          <Link to="/" className="hover:text-emerald-200 transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-emerald-200 transition-colors duration-200">About</Link>
          <Link to="/contact" className="hover:text-emerald-200 transition-colors duration-200">Contact</Link>
          <Link to="/grocery" className="hover:text-emerald-200 transition-colors duration-200">Grocery</Link>
        </nav>

        {/* Desktop Cart and User Info */}
        <div className="hidden lg:flex items-center gap-4 text-sm xl:text-base">
          <span className="flex items-center gap-1">
            <span className="hidden xl:inline">Status:</span>
            {onlineStatus ? "✅" : "🔴"}
          </span>
          <Link to="/cart" className="relative hover:scale-110 transition-transform duration-200">
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-7 h-7" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span className="text-emerald-100 font-medium">{user.name || user.email}</span>
              <button
                onClick={logout}
                className="bg-white text-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link to="/cart" className="relative">
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-emerald-600 border-t border-emerald-400">
          <nav className="px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 hover:text-emerald-200 transition-colors duration-200"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:text-emerald-200 transition-colors duration-200"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:text-emerald-200 transition-colors duration-200"
              onClick={() => setShowMobileMenu(false)}
            >
              Contact
            </Link>
            <Link 
              to="/grocery" 
              className="block py-2 hover:text-emerald-200 transition-colors duration-200"
              onClick={() => setShowMobileMenu(false)}
            >
              Grocery
            </Link>
            <div className="pt-2 border-t border-emerald-400">
              <div className="flex items-center justify-between py-2">
                <span className="flex items-center gap-2">
                  <span>Status:</span>
                  {onlineStatus ? "✅" : "🔴"}
                </span>
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="bg-white text-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                ) : null}
              </div>
              {user && (
                <div className="py-2 text-emerald-100 font-medium">
                  Welcome, {user.name || user.email}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
