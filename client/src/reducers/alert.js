import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

function alert(state = initialState, action) {
  const { payload, type } = action;
  console.log(payload.id);
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload.id);
    default:
      return state;
  }
}
export default alert;
