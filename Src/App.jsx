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

// import Grocery from "./Components/Grocery.jsx";


const Grocery = lazy(() => import("./Components/Grocery.jsx"))
const AppLayout = () => {
  return (
    <Provider store = {appStore}>
    <div className="app">
      <Header />
      <Outlet />
    </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Grocery/>
          </Suspense>
        )
      },
      {
        path:"/cart",
        element: <Cart/>
      },

    ],
    errorElement: <Error/>

  },
 
]);



 


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

// Export for testing purposes
export default AppLayout;
