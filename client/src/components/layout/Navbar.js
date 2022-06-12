import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return(
        <div>
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i>Job Profile</Link>
      </h1>
      <ul>
        <li><Link to="#">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link typeof="/login">Login</Link></li>
      </ul>
    </nav>
    <hr/>
    </div>
    );
}

export default Navbar;