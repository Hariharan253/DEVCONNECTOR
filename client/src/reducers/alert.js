import { SET_ALERT } from "../action/types";
import { REMOVE_ALERT } from "../action/types";
const initialState = [];
const alert = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      console.log("Entered SET_ALERT");
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alert;
