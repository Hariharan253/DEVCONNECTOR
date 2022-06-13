import React from "react";
import { Link, Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/landing'>Job Profile</Link>
        </h1>
        <ul>
          <li>
            <Link to='/landing/developers'>Developers</Link>
          </li>
          <li>
            <Link to='/landing/register'>Register</Link>
          </li>
          <li>
            <Link to='/landing/login'>Login</Link>
          </li>
        </ul>
      </nav>
      <br />
      <Outlet />
    </div>
  );
};

export default Navbar;
