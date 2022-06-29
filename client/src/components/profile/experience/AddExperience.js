import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addExperience } from "../../../action/profile";
import { connect } from "react-redux";
const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: "",
    description: "",
  });
  const navigate = useNavigate();
  const { title, company, location, from, to, current, description } = formData;
  console.log("educationFormData:", formData);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onSubmit = async (e) => {
    console.log("Education Form Submitted");
    e.preventDefault();
    const res = await addExperience(formData);
    if (res === undefined) {
      navigate("/dashboard");
    }
    //const res = await addEducation(formData);
    //console.log("Education res:", res);
    //     if (res === undefined) {
    //       navigate("/dashboard");
    //     }
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col col-md-12 col-lg-12 col-sm-12 text-center'>
            <h1 className='text-danger'>Add Experience</h1>
          </div>

          <div className='col col-md-12 col-lg-12 col-sm-12 mt-4'>
            <h5 className='text-dark'>Tell Us About Your Experience</h5>
            <h6 className='text-dark'>* = Required</h6>
          </div>
          <div className='col col-md-12 col-lg-12 col-sm-12 mt-4'>
            <div className='row'>
              <div className='col col-md-12 col-lg-12 col-sm-12'>
                <div className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <input
                      style={{ height: "30px" }}
                      type='text'
                      className='form-width'
                      placeholder='* Title of the Work Experience'
                      name='title'
                      value={title}
                      onChange={(e) => onChange(e)}
                      required={true}
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <input
                      style={{ height: "30px" }}
                      className='form-width'
                      type='text'
                      placeholder='* Company Name'
                      name='company'
                      value={company}
                      onChange={(e) => onChange(e)}
                      required={true}
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <input
                      style={{ height: "30px" }}
                      className='form-width'
                      type='text'
                      placeholder='Location'
                      name='location'
                      value={location}
                      onChange={(e) => onChange(e)}
                      required={true}
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <p>
                      <input
                        style={{ height: "30px" }}
                        type='checkbox'
                        name='Current'
                        checked={current}
                        value={current}
                        onChange={(e) => {
                          setFormData({ ...formData, current: !current });
                          toggleDisabled(!toDateDisabled);
                        }}
                      />{" "}
                      Current
                    </p>
                  </div>
                  <div className='form-group mt-3'>
                    <h6>* From</h6>
                    <input
                      style={{ height: "30px" }}
                      className='form-width'
                      type='input'
                      placeholder=' yyyy-mm-dd'
                      name='from'
                      value={from}
                      onChange={(e) => onChange(e)}
                      required={true}
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <h6 className='text-dark'>To</h6>
                    <input
                      style={{ height: "30px" }}
                      type='input'
                      className='form-width'
                      placeholder=' yyyy-mm-dd'
                      name='to'
                      value={to}
                      onChange={(e) => onChange(e)}
                      disabled={toDateDisabled ? "disabled" : ""}
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <textarea
                      rows='5'
                      cols='100'
                      placeholder='Description'
                      name='description'
                      value={description}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='mt-3 mb-4 form-group'>
                    <button
                      type='submit'
                      className='btn btn-sm btn-primary margin-right'
                      onClick={(e) => onSubmit(e)}
                    >
                      Submit
                    </button>
                    <Link to='/dashboard'>
                      <button className='btn btn-sm btn-warning'>
                        Go Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { addExperience })(AddExperience);
