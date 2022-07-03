import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { loginCustomer } from "../../action/customer/customer-auth/customerAuth";
import { connect } from "react-redux";
import Alert from "../Alert";
const CustomerLogin = ({ alert, loginCustomer, auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log("auth:", auth);
    const res = await loginCustomer(formData);
    console.log("Res Login:", res);
  };

  return (
    <Fragment>
      <Alert />
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
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    auth: state.auth,
  };
};

export default connect(null, { loginCustomer })(CustomerLogin);
