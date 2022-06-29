import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAlert from "./alert";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const data = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users",
        data,
        config
      );
      const d = dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      console.log(d);
    } catch (err) {
      const errors = err.response.data.error;
      console.log("err-1 ", errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5)));
      }
      const d = dispatch({
        type: REGISTER_FAILURE,
      });
      console.log("Err ", d);
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const data = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth",
        data,
        config
      );
      console.log("login Data: ", res.data);
      const d = dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      console.log(d);
    } catch (err) {
      const errors = err.response.data.error;
      console.log("err-1 ", errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5)));
      }

      const d = dispatch({
        type: LOGIN_FAIL,
      });
      console.log("Err ", d);
    }
  };

export const logOut = () => (dispatch) => {
  console.log("Entered logout");
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
