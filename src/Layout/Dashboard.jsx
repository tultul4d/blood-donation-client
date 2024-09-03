import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";
import { useEffect, useState } from "react";





const Dashboard = () => {
    // const [totalFunds, setTotalFunds] = useState(0);
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();


    const fetchTotalFunds = async () => {
        const response = await fetch('/dashboard/total-funds');
        const data = await response.json(); // This line expects JSON
        // console.log(data.totalFunds);
      };
      

    return (
        <div className="flex">
            <div className="lg:w-64 min-h-full lg:mt-10 bg-gray-400 rounded-xl">
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
                                <li><NavLink to="/dashboard/volunteerHome">Dashboard Home</NavLink></li>
                                <li><NavLink to="/dashboard/all-blood-donation-request">All Requests</NavLink></li>
                                <li><NavLink to="/dashboard/content-management">Content Management</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to="/">Go Back Home</NavLink></li>
                            </>
                        ) : (
                            <>
                                
                                <li><NavLink to="/dashboard/donor">Donor</NavLink></li>
                                <li><NavLink to="/addRequst">Create Donation Request </NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to="/">Go Back Home</NavLink></li>
                            </>
                        )}
                    
                    
                </ul>

                <div>
                <h3>Total Funds Collected: ${fetchTotalFunds}</h3>
            </div>
            </div>


            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
