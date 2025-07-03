import React, { useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext.jsx";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, signup } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        if (!form.name || !form.email || !form.password) {
          setError("All fields are required.");
          return;
        }
        await signup(form.name, form.email, form.password);
      } else {
        if (!form.email || !form.password) {
          setError("Email and password are required.");
          return;
        }
        await login(form.email, form.password);
      }
      setError("");
      navigate("/");
    } catch (err) {
      // Firebase error codes
      let msg = "An error occurred. Please try again.";
      if (err.code === "auth/user-not-found") msg = "No user found with this email.";
      else if (err.code === "auth/wrong-password") msg = "Incorrect password.";
      else if (err.code === "auth/email-already-in-use") msg = "Email is already in use.";
      else if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (err.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
      setError(msg);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image, same as home page */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      {/* Form content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-2 sm:px-4 py-8">
        <div className="bg-white/90 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-emerald-100 flex flex-col items-center">
          {/* Logo */}
          <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Foodify Logo" className="w-16 h-16 mb-4 drop-shadow-lg" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mb-2 text-center drop-shadow-xl tracking-tight">
            {isSignUp ? "Create your Foodify account" : "Sign in to Foodify"}
          </h2>
          <p className="text-gray-600 text-sm mb-6 text-center max-w-xs">
            {isSignUp ? "Sign up to start discovering and ordering your favorite food!" : "Sign in to continue to Foodify and enjoy delicious meals."}
          </p>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base shadow-sm"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base shadow-sm"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base shadow-sm"
              required
            />
            {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-500 font-semibold shadow-lg transition-all duration-200 text-base tracking-wide"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-700">
            {isSignUp ? "Already have an account?" : "New here?"} {" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-emerald-600 underline font-semibold hover:text-emerald-700 transition-colors"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 