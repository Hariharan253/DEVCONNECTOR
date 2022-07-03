import axios from "axios";
import {
  REGISTER_CUSTOMER_SUCCESS,
  LOGIN_CUSTOMER_SUCCESS,
  CUSTOMER_LOADED,
  AUTH_ERROR,
} from "../../../action/types";
import setAuthToken from "../../../utils/setAuthToken";
import setAlert from "../../alert";

const loadCustomer = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("http://localhost:5000/api/customers-auth");
    console.log("res.data of customers-auth", res.data);
    const customer = res.data;
    dispatch({
      type: CUSTOMER_LOADED,
      payload: customer,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerCustomer = (formData) => async (dispatch) => {
  const { name, email, password } = formData;

  console.log("form data", formData);
  const data = JSON.stringify({ name, email, password });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost:5000/api/customers",
      data,
      config
    );
    console.log("res.data", res.data);
    dispatch({
      type: REGISTER_CUSTOMER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadCustomer());
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("err-1 ", errors);
    if (errors) {
      errors.forEach((error, index) =>
        dispatch(setAlert(error.msg, "danger", index))
      );
    }

    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
    return errors;
  }
};

export const loginCustomer = (formData) => async (dispatch) => {
  console.log("formData:", formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost:5000/api/customers-auth",
      formData,
      config
    );
    console.log("Res:", res); //
    dispatch({
      type: LOGIN_CUSTOMER_SUCCESS,
      payload: res.data, //Passing the auth token
    });

    dispatch(loadCustomer()); //Load customer Data for later use
    return res;
  } catch (err) {
    // const errors = err.response.data.errors;
    // console.log("err-1 ", errors);
    // if (errors) {
    //   errors.forEach((error, index) =>
    //     dispatch(setAlert(error.msg, "danger", index))
    //   );
    // }
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
    //return errors;
    return err;
  }
};
