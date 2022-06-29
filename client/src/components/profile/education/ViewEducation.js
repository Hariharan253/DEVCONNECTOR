import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import auth from "../../../reducers/auth";
import { PropTypes } from "prop-types";
import "../../../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteEducation } from "../../../action/profile";
import Alert from "../../../auth/Alert";
import axios from "axios";
import { UPDATE_PROFILE } from "../../../action/types";
import EditEducation from "./EditEducation";
import { editEducationWithId } from "../../../action/edit";

const ViewEducation = ({
  profile: { profile, loading },
  deleteEducation,
  editEducationWithId,
}) => {
  const navigate = useNavigate();
  console.log(profile);
  const onClickDelete = async (e, id) => {
    // e.persist();
    console.log("edu:", e, id);
    const res = await deleteEducation(id);

    console.log(res);
  };
  const onClickEdit = (id) => {
    console.log("Entered OnCLick Edit ID:", id);
    editEducationWithId(id);
    navigate("/edit-education");
  };

  useEffect(() => {}, [loading]);

  return (
    <Fragment>
      <Alert />
      {profile.education.length > 0 ? (
        <Fragment>
          <h1 className='text-danger text-center'>View Education</h1>
          <div className='container'>
            <div className='row'>
              {profile.education.map((edu, index) => {
                return (
                  <Fragment key={index}>
                    <div className='col col-sm-12 col-lg-4 col-md-4'>
                      <div className='profile rounded'>
                        <p className='profile-heading text-center text-warning'>
                          Education: {`${index + 1}`}
                        </p>
                        <div className='profile-body text-secondary text-center'>
                          ID: {edu._id}
                        </div>
                        <div className='profile-body text-secondary text-center mt-2'>
                          <button
                            className='btn btn-sm btn-warning margin-right'
                            onClick={() => onClickEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={(e) => onClickDelete(e, edu._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='container'>
            <h4 className='text-center text-danger'>
              No Education Field Availabale Want To Create One Click Here{" "}
              <Link to='/add-education'>Click</Link>
            </h4>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewEducation.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  editEducationWithId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  deleteEducation,
  editEducationWithId,
})(ViewEducation);
