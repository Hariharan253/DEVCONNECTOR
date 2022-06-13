import React, { Fragment, useState } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import setAlert from "../actions/alert";
import Alert from "./Alert";

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password Incorrect", "danger");
    } else {
      console.log("Created");
    }
  };
  return (
    <Fragment>
      <Alert />
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <div class='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </div>
        </div>
        <div class='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <input type='submit' class='btn btn-primary' value='Register' />
      </form>
      <div>
        <p>
          Already Have A Account? <Link to='/landing/login'>LogIn</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default connect(null, { setAlert })(Register);
