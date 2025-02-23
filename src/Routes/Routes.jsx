import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import SignIn from "../pages/SignIn/SignIn";

// import PrivateRoute from "./PrivateRoute";
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
import RequstUpdate from "../pages/Dashboard/RequstUpdate";
import RequstView from "../pages/Dashboard/RequstView";
import AllRequst from "../pages/Dashboard/AllRequst";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdmineHome from "../pages/Dashboard/AdmineHome";
import AllBloodDonationRequestPage from "../pages/Dashboard/AllBloodDonationRequestPage";
import PrivateRoute from "./PrivateRoute";
import SearchPage from "../pages/SearchPage";
import VolunteerHome from "../pages/Dashboard/VolunteerHome";


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
          element: <PrivateRoute><RequstDetails></RequstDetails></PrivateRoute>,
          loader: ({params}) => fetch(`https://blood-donation-server-five.vercel.app/request/${params.id}`)
        },
        
        
      
      {
        path: "/blogs",
        element: <BlogPage></BlogPage>
      },
      {
        path: "/blogs/:id",
        element:<BlogDetails></BlogDetails>,
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>
      }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path:"profile",
          element: <Profile></Profile> 
        },
        {
          path:"/dashboard/donor",
          element:<Donor></Donor>
        },
        {
          path: "/dashboard/edit/:id",
          element:<RequstUpdate></RequstUpdate>,
          loader: ({params}) => fetch(`https://blood-donation-server-five.vercel.app/request/${params.id}`)
        },
        {
          path: "/dashboard/view/:id",
          element: <RequstView></RequstView>,
          loader: ({params}) => fetch(`https://blood-donation-server-five.vercel.app/request/${params.id}`)
        },
        {
          path: "/dashboard/my-donation-requests",
          element: <AllRequst></AllRequst>
        },

        // admin

        {
          path: "/dashboard/allUser",
          element:<AllUsers></AllUsers>
        },
        {
          path: "/dashboard/adminHome",
          element: <AdmineHome></AdmineHome>
        },
        {
          path: "/dashboard/content-management/add-blog",
          element: <AddBlog />
      },
        
        {
          path: "/dashboard/content-management",
          element: <ContentManagement />
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AllBloodDonationRequestPage></AllBloodDonationRequestPage>
      },
      {
        path: "/dashboard/volunteerHome",
        element: <VolunteerHome></VolunteerHome>
      }
      ]
    }
  ]);
