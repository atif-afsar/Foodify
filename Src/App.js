import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import { createBrowserRouter , Outlet, RouterProvider } from "react-router";
import { Provider } from 'react-redux'
import appStore from "./Utils/appStore";
import Cart from "./Components/Cart";

// import Grocery from "./Components/Grocery";


const Grocery = lazy(() => import("./Components/Grocery"))
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
        element: <Suspense fallback ={<h1>Loading.....</h1>}><Grocery/></Suspense>
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
