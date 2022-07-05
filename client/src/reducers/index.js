import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import edit from "./edit";
import navigationPage from "./navigationPage";
import temporary from "./temporary";
const rootReducer = combineReducers({
  alert,
  auth,
  profile,
  edit,
  navigationPage,
  temporary,
});

export default rootReducer;
