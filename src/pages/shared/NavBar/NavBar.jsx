import React from 'react';
import { Link, NavLink } from 'react-router';
import SwiftTrackLogo from '../swiftTrackLogo/SwiftTrackLogo';
import useAuth from '../../../hooks/useAuth';
import './Navbar.css'
import Alert from '../alert/Alert';

const NavBar = () => {


  const handleLogout = ()=>{
    signOutUser()
      .then(() => {
        Alert('success', 'Logged out successfully');
        // Handle successful logout
      })
      .catch((error) => {
        // Handle errors during logout
        console.error("Logout error:", error);
      });
     
  }


  const {user,signOutUser} = useAuth();

    const links = <>
       <NavLink className='ml-3 a' to='/'>Home</NavLink>
       <NavLink className='ml-3 a' to='/coverage'>Coverage</NavLink>
       {
        user && <NavLink className='ml-3 a' to='/dashboard'>Dashboard</NavLink>

       }
      <NavLink className='ml-3 a' to='/send-parcel'>Send parcel</NavLink>
       
       <NavLink className='ml-3 a' to='/about'>About us</NavLink>
    </>
    return (
        <div className="navbar shadow-lg bg-transparent px-4 border border-lime-300 mt-1 rounded-xl">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
            links
        }
      </ul>
    </div>
    <div className="hidden lg:block">
      <SwiftTrackLogo></SwiftTrackLogo>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        links
      }
    </ul>
  </div>
  <div className="navbar-end">

     {user ? (
         <button onClick={handleLogout} className='btn  bg-lime-400 rounded-xl'>Logout</button>
       
      ) : (
         <button className='btn  bg-lime-400 rounded-xl'><Link to='/login'>Login</Link></button>
        
      )}
  </div>
</div>
    );
};

export default NavBar;