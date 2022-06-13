//import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = 1;

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
