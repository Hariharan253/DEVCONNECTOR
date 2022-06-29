import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteExperience } from "../../../action/profile";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../../auth/Alert";
import { editExperienceWithId } from "../../../action/edit";
const ViewExperience = ({
  profile: { profile, loading },
  deleteExperience,
  editExperienceWithId,
}) => {
  const onClickDelete = async (e, id) => {
    // e.persist();
    console.log("edu:", e, id);
    const res = await deleteExperience(id);
    console.log(res);
  };

  const navigate = useNavigate();

  const onClickEdit = (id) => {
    console.log("Entered OnCLick Edit ID:", id);
    editExperienceWithId(id);
    navigate("/edit-experience");
  };

  return (
    <Fragment>
      <Alert />
      {profile.experience.length > 0 ? (
        <Fragment>
          <h1 className='text-danger text-center mb-3'>View Education</h1>
          <div className='container'>
            <div className='row mt-3'>
              {profile.experience.map((exp, index) => {
                return (
                  <Fragment key={index}>
                    <div className='col col-sm-12 col-lg-4 col-md-4'>
                      <div className='profile rounded'>
                        <p className='profile-heading text-center text-warning'>
                          Experience: {`${index + 1}`}
                        </p>
                        <div className='profile-body text-secondary text-center'>
                          ID: {exp._id}
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
                            onClick={(e) => onClickDelete(e, exp._id)}
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
              No Experience Field Availabale Want To Create One Click Here{" "}
              <Link to='/add-experience'>Click</Link>
            </h4>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  deleteExperience,
  editExperienceWithId,
})(ViewExperience);
