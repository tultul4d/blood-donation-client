import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";





const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    return (
        <div className="flex">
            <div className="lg:w-64 min-h-full lg:mt-16 bg-red-600">
                <ul className="menu">
                    {
                        isAdmin ? (
                            <>
                                <li><NavLink to="/dashboard/adminHome">Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/allUser">All Users</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donation-request">All Requests</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to="/">Go Back Home</NavLink></li>
                            </>
                        ) : isVolunteer ? (
                            <>
                                <li><NavLink to="/dashboard">Dashboard Home</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donation-request">All Requests</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to="/">Go Back Home</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                                <li><NavLink to="/dashboard/donor">Donor</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to="/">Go Back Home</NavLink></li>
                            </>
                        )}
                    
                    
                </ul>
            </div>


            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
