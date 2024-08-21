import { NavLink, Outlet } from "react-router-dom";



const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-full mt-16 bg-red-600">
                <ul className="menu">
                    <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                    <li><NavLink to="/dashboard/donor">Donor</NavLink></li>
                    
                    <div className="divider"></div>
                    <li><NavLink to="/">Go Back Home</NavLink></li>
                </ul>
            </div>


            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
