import { PropTypes } from "prop-types";
import React, { Fragment } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/profile.css";
import { Navigate, Link } from "react-router-dom";
const Profile = (props) => {
  const { profile } = props.profile;
  // const { instagram, twitter, facebook, linkedin } = profile.social;
  const social = profile.social;
  console.log("social:", social);
  const socialArray = [];
  socialArray.push(social);
  console.log("socialArray:", socialArray);
  const onSubmit = () => {
    console.log("Entered edit-profile");
    return <Navigate to='/dashboard' replace={true} />;
  };
  const onSocial = () => {
    let count = 0;
    let content = [];
    for (let property in social) {
      count += 1;
      console.log(`${property}: ${social[property]}`);
      const c = (
        <div key={count}>
          <a href='#'>
            <h5 className='text-dark links'>{`${property}: ${social[property]}`}</h5>
          </a>
        </div>
      );
      content.push(c);
    }
    return content;
    console.log("count:", count);
  };
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col col-md-12 col-sm-12 col-lg-12 text-center'>
            <h1 className='text-danger'>My Profile</h1>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col col-md-6 col-sm-12 col-lg-4 text-center mt-3'>
            <div className='profile rounded'>
              <div className='profile-heading text-center text-warning'>
                User Details
              </div>
              <div className='profile-body text-secondary'>
                <h5>Name: {profile.user.name}</h5>
                <h5>User ID: {profile.user._id}</h5>
              </div>
            </div>
          </div>
          <div className='col col-md-6 col-sm-12 col-lg-4 text-center mt-3'>
            <div className='profile rounded'>
              <p className='profile-heading text-center text-warning'>Skills</p>
              <div className='profile-body text-secondary'>
                {profile.skills.map((skill, index) => {
                  return (
                    <div key={index}>
                      <h5>{`skill ${index + 1}: ${skill}`}</h5>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='col col-md-6 col-sm-12 col-lg-4 text-center mt-3'>
            <div className='profile rounded'>
              <p className='profile-heading text-center text-warning'>Status</p>
              <div className='profile-body text-secondary'>
                <h3>{profile.status}</h3>
              </div>
            </div>
          </div>
          <div className='col col-md-6 col-sm-12 col-lg-4 text-center mt-3'>
            <div className='profile rounded'>
              <p className='profile-heading text-center text-warning'>Social</p>
              <div className='profile-body text-secondary'>{onSocial()}</div>
            </div>
          </div>
          {profile.education.length > 0 && (
            <div className='col col-md-6 col-sm-12 col-lg-4 text-center mt-3'>
              <Link to='/view-education'>
                <div className='profile rounded'>
                  <p className='profile-heading text-center text-warning'>
                    Education
                  </p>
                  <div className='profile-body text-secondary'>
                    <h3>View Education</h3>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {profile.experience.length > 0 && (
            <div className='col col-md-6 col-sm-12 col-lg-4 text-center mt-3'>
              <Link to='/view-experience'>
                <div className='profile rounded'>
                  <p className='profile-heading text-center text-warning'>
                    Experience
                  </p>
                  <div className='profile-body text-secondary'>
                    <h3>View Experience</h3>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className='row mt-4 mb-5'>
          <div className='text-center col col-lg-12 col-md-12 col-sm-12'>
            <Link to='/edit-profile'>
              <button className='btn btn-sm btn-danger'>Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps, null)(Profile);
