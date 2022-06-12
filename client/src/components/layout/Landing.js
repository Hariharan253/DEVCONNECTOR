import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <section>
        <div>
          <div>
            <h1>Job Profile</h1>
            <p>Create a developer profile/portfolio, and find a Job</p>
            <div >
              <Link to="/register" class="btn btn-primary">Sign Up</Link>
              <Link to="/login" class="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>  
    );
}

export default Landing;