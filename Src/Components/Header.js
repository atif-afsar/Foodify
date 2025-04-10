import { useState } from "react";
import LOGO_URL from "../Utils/constants";
import { Link } from "react-router";
const Header = () => {
  const [btnNameReact, setBtnReactName] = useState("Login")
    return (
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={LOGO_URL}
          />
        </div>
        <div className="nav-items">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>Cart</li>
          </ul>
          <button className="login-btn"
          
          onClick={()=> {
            btnNameReact === "Login"
            ? setBtnReactName("Logout")
            : setBtnReactName("Login");
          }}
          >{btnNameReact}</button>

        </div>
      </div>
    );
  };
  
  export default Header;