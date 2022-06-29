import React, { Fragment, useEffect } from "react";
import { getCurrentProfile } from "../../action/profile";
import { connect } from "react-redux";
import auth from "../../reducers/auth";
import Spinner from "../layout/Spinner.js";
import PropTypes from "prop-types";
import "../../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteProfile } from "../../action/profile";
import Alert from "../../auth/Alert";
const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
  deleteProfile,
}) => {
  useEffect(() => {
    console.log("Entered useEffect in Dashboard");
    getCurrentProfile();
  }, []);
  const navigate = useNavigate();
  const onClick = () => {
    deleteProfile();
    navigate("/dashboard");
  };

  //const { isAuthenticated, loading } = auth;
  return (
    <Fragment>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container'>
            <div className='row'>
              <div className='col col-lg-12 col-md-12 bg-success text-warning'>
                <Alert />
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col col-lg-12 text-center'>
                <h1>Dashboard</h1>
              </div>
            </div>
            <div className='row justify-content-center mt-4'>
              <div className='col col-lg-12'>
                <h4>User Loaded</h4>
              </div>
            </div>
            <div className='row justify-content-center mt-4'>
              <div className='col col-lg-12 '>
                {auth.user !== null && <h5>UserName: {auth.user.name}</h5>}
              </div>
            </div>
            {profile !== null ? (
              <Fragment>
                <div className='row justify-content-center mt-4'>
                  <div className='col col-lg-12'>
                    <Link to='/edit-profile'>
                      <button className='btn btn-sm btn-warning margin-right'>
                        Edit Profile
                      </button>
                    </Link>

                    <Link to='/add-experience'>
                      <button className='btn btn-sm btn-success margin-right'>
                        Add Experience
                      </button>
                    </Link>
                    <Link to='/add-education'>
                      <button className='btn btn-sm btn-success margin-right'>
                        Add Education
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='row justify-content-center mt-4'>
                  <div className='col col-lg-12 '>
                    <button
                      className='btn btn-sm btn-danger margin-right'
                      onClick={() => onClick()}
                    >
                      Delete Profile
                    </button>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Link to='/create-profile'>
                <button className='btn btn-sm btn-success'>
                  Create Profile
                </button>
              </Link>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth.user,
    profile: state.profile,
  };
}

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(
  Dashboard
);
