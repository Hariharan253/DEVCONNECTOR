import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disableNavigation } from "../../../../action/customer/navigationPage/navigationPage";
import { setTempEducationForJob } from "../../../../action/customer/temporary/temporary";
const AddEducationJob = ({
  navigationPage: { pageToNavigate },
  disableNavigation,
  setTempEducationForJob,
  temporary,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    degree: temporary.tempEducationJob.degree,
    fieldofstudy: temporary.tempEducationJob.fieldofstudy,
    description: temporary.tempEducationJob.description,
  });
  const { degree, fieldofstudy, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => console.log("pageToNavigate:", pageToNavigate), []);
  const goBack = () => {
    //console.log("pageToNavigate:", pageToNavigate);
    navigate(`/${pageToNavigate}`);
    disableNavigation();
  };

  const onSubmit = (e) => {
    //console.log("pageToNavigate:", pageToNavigate);
    e.preventDefault();
    const res = setTempEducationForJob(formData);
    navigate(`/${pageToNavigate}`);
    disableNavigation();
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col col-md-12 col-lg-12 col-sm-12 text-center'>
            <h1 className='text-danger'>Add Job</h1>
          </div>
          <div className='col col-md-12 col-lg-12 col-sm-12 mt-4'>
            <h5 className='text-dark'>Tell Us About Your Education</h5>
            <h6 className='text-dark'>* = Required</h6>
          </div>
          <div className='col col-md-12 col-lg-12 col-sm-12 mt-4'>
            <div className='row'>
              <div className='col col-md-12 col-lg-12 col-sm-12'>
                <div className='form'>
                  <div className='form-group mt-3'>
                    <input
                      style={{ height: "30px" }}
                      className='form-width'
                      type='text'
                      placeholder='* Degree or Certificate'
                      name='degree'
                      value={degree}
                      onChange={(e) => onChange(e)}
                      required={true}
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <input
                      style={{ height: "30px" }}
                      className='form-width'
                      type='text'
                      placeholder='* Field Of Study'
                      name='fieldofstudy'
                      value={fieldofstudy}
                      onChange={(e) => onChange(e)}
                      required={true}
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

                    <button
                      className='btn btn-sm btn-warning'
                      onClick={() => goBack()}
                    >
                      Go Back
                    </button>
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
    navigationPage: state.navigationPage,
    temporary: state.temporary,
  };
};

export default connect(mapStateToProps, {
  disableNavigation,
  setTempEducationForJob,
})(AddEducationJob);
