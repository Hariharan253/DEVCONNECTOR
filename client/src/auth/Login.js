import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Logged In");
  };
  return (
    <Fragment>
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
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
        <input type='submit' class='btn btn-primary' value='Register' />
        <div>
          <span>
            Don't Have a Account? <Link to='/landing/register'>Register</Link>
          </span>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
