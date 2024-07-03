import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import SignIn from "../pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import Details from "../pages/Details/Details";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signin',
          element: <SignIn></SignIn>
        },
        {
          path: '/donation',
          element: <DonationRequest></DonationRequest>
        },
        {
          path: '/detail/:id',
          element:<Details></Details>
        },
        {
          path:"/dashboard",
          element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
        }
      ]
    },
  ]);
