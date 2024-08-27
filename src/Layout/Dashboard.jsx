import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";





const Dashboard = () => {

    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="lg:w-64 min-h-full lg:mt-16 bg-red-600">
                <ul className="menu">
                    {
                        isAdmin ? <>
                        <li><NavLink to="/dashboard/adminHome">Admin Home</NavLink></li>
                    <li><NavLink to="/dashboard/allUser">All User</NavLink></li>
                    <li><NavLink to="/dashboard/content-management">Add Blogs</NavLink></li>
                    <li><NavLink to="/dashboard/all-blood-donation-request">All Request</NavLink></li>
                    <div className="divider"></div>
                                   <li><NavLink to="/">Go Back Home</NavLink></li>
                        </>
                        :
                        <>
                        <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                    <li><NavLink to="/dashboard/donor">Donor</NavLink></li>
                    {/* <li><NavLink to="/dashboard/donor">All User</NavLink></li> */}
                    <div className="divider"></div>
                    <li><NavLink to="/">Go Back Home</NavLink></li>
                        </>
                    }
                    
                    
                </ul>
            </div>


            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
