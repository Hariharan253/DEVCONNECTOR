import React, { Fragment, useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import "../styles/register.css";
import { login } from "../action/auth";
import { connect } from "react-redux";
import Alert from "./Alert";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login({ email, password });
    console.log("User Logged In");
  };

  // if (props.auth.isAuthenticated === true) {
  //   console.log("Entered ISAUTHENTICATED");
  //   return <Navigate to='/dashboard' replace={true} />;
  // }
  return (
    <Fragment>
      {props.auth.isAuthenticated === true && (
        <Navigate to='/dashboard' replace={true} />
      )}
      <Alert />
      <div className='container'>
        <div className='row justify-row-center'>
          <div className='col-xs-1 text-center'>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
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
                <button type='submit' className='btn btn-sm btn-primary'>
                  Submit
                </button>
                <p>
                  Don't Have an Account? <Link to='/register'>Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { login })(Login);
