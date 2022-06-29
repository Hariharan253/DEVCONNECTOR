import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createProfile } from "../../action/profile";
import Alert from "../../auth/Alert";
const CreateProfile = ({ createProfile, alert }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  console.log("displaySocialInputs:", displaySocialInputs);
  console.log("formData:", formData);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const history = 1;
    const res = await createProfile(formData);
    console.log("res:", res);
    if (res === undefined) {
      console.log("Have To Navigate");
      navigate("/dashboard");
    }
  };

  return (
    <Fragment>
      <Alert />
      <h3 className='large text-primary text-center'>Create Your Profile</h3>
      <p className='lead mt-4'>
        <i className='fas fa-user'></i>
        Let's Get Your Informsation to form your profile
      </p>
      <small>* = Required Field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' onChange={(e) => onChange(e)} value={status}>
            <option value='0'>* Select Proffessional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
          </select>
          <small className='form-text'>
            Give us An Idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            onChange={(e) => onChange(e)}
            value={company}
          />
          <small className='form-text'>
            Could be Your Own Company or One You Work At
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            onChange={(e) => onChange(e)}
            value={website}
          />
          <small className='form-text'>Could be Your Own Company Website</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => onChange(e)}
            value={location}
          />
          <small className='form-text'>
            City & state Suggested (Chennai, India)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <small className='form-text'>
            Please use comma seperated values eg(HTML,CSS,JS)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Git Hub UserName'
            name='githubusername'
            onChange={(e) => onChange(e)}
            value={githubusername}
          />
          <small className='form-text'>Your GitHub User Name</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short Bio About You'
            name='bio'
            onChange={(e) => onChange(e)}
            value={bio}
          />
          <small className='form-text'>Tell Us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                onChange={(e) => onChange(e)}
                value={twitter}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                onChange={(e) => onChange(e)}
                value={facebook}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='LinkedIn URL'
                name='linkedin'
                onChange={(e) => onChange(e)}
                value={linkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                onChange={(e) => onChange(e)}
                value={youtube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                onChange={(e) => onChange(e)}
                value={instagram}
              />
            </div>
          </Fragment>
        )}

        <div className='form-group'>
          <button type='submit' className='btn btn-success btn-sm margin-right'>
            Submit
          </button>
          <Link to='/dashboard'>
            <button type='button' className='btn btn-primary btn-sm'>
              Go Back
            </button>
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { createProfile })(CreateProfile);
