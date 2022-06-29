import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token; //Default header thrioughout my code
  } else {
    delete axios.defaults.headers.common("x-auth-token");
  }
};

export default setAuthToken;
