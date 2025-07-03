import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header.jsx";
import Body from "./Components/Body.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Error from "./Components/Error.jsx";
import RestaurantMenu from "./Components/RestaurantMenu.jsx";
import { createBrowserRouter , Outlet, RouterProvider } from "react-router";
import { Provider } from 'react-redux'
import appStore from "./Utils/appStore.jsx";
import Cart from "./Components/Cart.jsx";
import { UserProvider, UserContext } from "./Utils/UserContext.jsx";
import SignIn from "./Components/SignIn.jsx";
import { useContext } from "react";
import { Navigate } from "react-router";

// import Grocery from "./Components/Grocery.jsx";


const Grocery = lazy(() => import("./Components/Grocery.jsx"))

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-emerald-600 text-xl font-bold">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Body />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: (
          <ProtectedRoute>
            <RestaurantMenu />
          </ProtectedRoute>
        ),
      },
      {
        path: "/grocery",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<h1>Loading.....</h1>}>
              <Grocery />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);



 


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <RouterProvider router={appRouter} />
  </UserProvider>
);

// Export for testing purposes
export default AppLayout;
