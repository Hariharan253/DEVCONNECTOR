import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_CUSTOMER_SUCCESS,
  CUSTOMER_LOADED,
  LOGIN_CUSTOMER_SUCCESS,
} from "../action/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  customer: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CUSTOMER_LOADED:
      console.log("Entered CUSTOMER_LOADED");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        customer: payload,
      };

    case USER_LOADED:
      console.log("Entered USER_LOADED");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_CUSTOMER_SUCCESS:
    case LOGIN_CUSTOMER_SUCCESS:
      localStorage.setItem("token", payload.token);
      console.log("Entered REGISTER_SUCCESS");
      console.log("Err ", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAILURE:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      console.log("Entered REGISTER_FAILURE");
      return {
        ...state,
        profile: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        customer: null,
      };
    default:
      return state;
  }
}
