import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../action/auth";

// export const logout = () => (dispatch) => {
//   console.log("Entered logout");
//   dispatch({ type: LOGOUT });
// };

const Navbar = (props) => {
  const guestLinks = (
    <div className='navbar-links'>
      <p>
        <Link to='/developers'>developers</Link>
      </p>
      {"     "}
      <p>
        <Link to='/register'>Register</Link>
      </p>
      {"    "}
      <p>
        <Link to='/login'>LogIn</Link>
      </p>
      {"      "}
    </div>
  );
  const authLinks = (
    <Fragment>
      <div className='navbar-links'>
        <div>
          <Link to='/profile'>Profile</Link>
        </div>
        <div>
          <a onClick={props.logOut}>LogOut</a>
        </div>
      </div>
    </Fragment>
  );
  const { loading, isAuthenticated } = props.auth;
  return (
    <Fragment>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col col-lg-12 col-sm-12 col-md-12'>
            <div className='navbar'>
              <Link to='/dashboard'>
                <h1>Navbar</h1>
              </Link>
              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Outlet /> */}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logOut })(Navbar);
