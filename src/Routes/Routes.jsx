import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import SignIn from "../pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";
// import Dashboard from "../pages/Dashboard/Dashboard";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import RequstDetails from "../pages/RequstDetails/RequstDetails";
import ContentManagement from "../pages/ContentManagement/ContentManagement";
import AddBlog from "../pages/AddBlog/AddBlog";
import BlogPage from "../pages/BlogPage/BlogPage";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import Profile from "../pages/Dashboard/Profile/Profile";
import Dashboard from "../Layout/Dashboard";
import Donor from "../pages/Dashboard/Donor";
import AddRequst from "../pages/AddRequst/AddRequst";


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
       
        // {
        //   path:"/dashboard",
        //   element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
        // },
        {
          path:"/addRequst",
          element:<AddRequst></AddRequst>,
        },
        {
          path: '/details/:id',
          element: <RequstDetails></RequstDetails>,
          loader: ({params}) => fetch(`http://localhost:5000/request/${params.id}`)
        },
        
        {
          path: "/dashboard/content-management",
          element: <ContentManagement />
      },
      {
          path: "/dashboard/content-management/add-blog",
          element: <AddBlog />
      },
      {
        path: "/blogs",
        element: <BlogPage></BlogPage>
      },
      {
        path: "/blogs/:id",
        element:<BlogDetails></BlogDetails>,
      }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path:"profile",
          element: <Profile></Profile> 
        },
        {
          path:"/dashboard/donor",
          element:<Donor></Donor>
        }
      ]
    }
  ]);
