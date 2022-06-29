import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import edit from "./edit";
const rootReducer = combineReducers({
  alert,
  auth,
  profile,
  edit
});

export default rootReducer;
