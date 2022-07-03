import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/register.css";
import { connect } from "react-redux";
import setAlert from "../action/alert";
import { register } from "../action/auth";
import CustomerRegister from "./customer-auth/CustomerRegister";
import Alert from "./Alert";
const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const [id, setId] = useState(0);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("Incorrect Password", "danger", id);
      setId(id + 1);
      console.log("alerts ", props);
    } else {
      console.log("name: ", name);
      props.register({ name, email, password });
      setTimeout(() => console.log("Alerts ", props), 4000);
      console.log("User Created");
    }
  };
  return (
    <Fragment>
      {props.auth.isAuthenticated === true && (
        <Navigate to='/dashboard' replace={true} />
      )}
      <div className='container'>
        <div className='row'>
          {/* <div className='col-lg-6 col-md-6 col-sm-6 mb-5'>
            <Alert />
          </div> */}
          <div className='col-lg-6 col-md-6 col-sm-6'>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='name'
                  placeholder='Enter Name'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Check Password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-sm btn-primary'>
                  Submit
                </button>
                <p>
                  Have an Account? <Link to='/login'>login</Link>
                </p>
              </div>
            </form>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6'>
            <CustomerRegister />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    alerts: state.alert,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { setAlert, register })(Register);
