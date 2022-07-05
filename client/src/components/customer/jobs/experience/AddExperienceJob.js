import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../../../auth/Alert";
// import { setEducationWithJobId } from "../../../../action/customer/education/education";
import { disableNavigation } from "../../../../action/customer/navigationPage/navigationPage";
import { setTempExperienceForJob } from "../../../../action/customer/temporary/temporary";
const AddExperienceJob = ({
  navigationPage: { pageToNavigate },
  disableNavigation,
  setTempExperienceForJob,
}) => {
  useEffect(() => {
    console.log("pageToNavigate", pageToNavigate);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    years: "",
    description: "",
  });

  const { title, years, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = setTempExperienceForJob(formData);
    navigate(`/${pageToNavigate}`);
    disableNavigation();
  };

  const goBack = () => {
    navigate(`/${pageToNavigate}`);
    disableNavigation();
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
          <input
            type='text'
            placeholder='Title'
            name='title'
            onChange={(e) => onChange(e)}
            value={title}
          />
          <small className='form-text'>Required Degree for your job</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='year(s) of experience needed'
            name='years'
            onChange={(e) => onChange(e)}
            value={years}
          />
          <small className='form-text'>Could be Your Own Company Website</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short description About Your Job'
            name='description'
            onChange={(e) => onChange(e)}
            value={description}
          />
          <small className='form-text'>Tell Us a little about yourself</small>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-success btn-sm margin-right'>
            Submit
          </button>

          <button
            type='button'
            className='btn btn-primary btn-sm'
            onClick={() => goBack()}
          >
            Go Back
          </button>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    navigationPage: state.navigationPage,
  };
};

export default connect(mapStateToProps, {
  disableNavigation,
  setTempExperienceForJob,
})(AddExperienceJob);
