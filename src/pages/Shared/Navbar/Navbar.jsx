import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";


const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);

  const handleLogOut = () => {
      logOut()
      .then(() =>{})
      .catch(error => console.log(error));
  }
    const navOptions = <>
    
    <li><Link to="/">Home</Link></li>
     
    <li><Link to="/donation">Donation Requests</Link></li>
    <li><Link to="/blogs">blog</Link></li>
    

    {
      user ? <> <li><Link to="/dashboard">Dashboard</Link></li> </> : <> </>
    }
    
    {
      user ? <>
      <button onClick={handleLogOut} className="btn btn-active btn-accent">LogOut</button></> : <><li><Link to="/login">Login</Link></li></>
    }
    </>
    return (
        <>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {navOptions}
      </ul>
    </div>
    {/* <img src="" alt="" /> */}
    <a className="btn btn-ghost text-xl"><img className="w-10 h-10" src="https://i.ibb.co/v1bKqfg/blood-donation-9255161.png" alt="" /> Blood Donation </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Get </a>
  </div>
</div>
        </>
    );
};

export default Navbar;