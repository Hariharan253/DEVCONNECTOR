import { Fragment, useState } from "react";
import React from "react";
import setAlert from "../../action/alert";
import { registerCustomer } from "../../action/customer/customer-auth/customerAuth";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../Alert";
const CustomerRegister = ({ registerCustomer }) => {
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
    console.log("Submit Entered");
    e.preventDefault();
    if (password != password2) {
      setAlert("Password Incorrect", "danger");
    } else {
      const res = await registerCustomer(formData);
      console.log("res:", res);
    }
  };

  return (
    <Fragment>
      <Alert />
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='name'
            placeholder='Enter Company Name'
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
    </Fragment>
  );
};

export default connect(null, { registerCustomer })(CustomerRegister);
