import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";
const setAlert = (msg, alertType, id) => (dispatch) => {
  // const id = 1;
  console.log("setAlert is Entered");
  dispatch({
    type: SET_ALERT,
    payload: { msg, id, alertType },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    5000
  );
};

export default setAlert;
