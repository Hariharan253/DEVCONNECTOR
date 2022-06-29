import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
const redux = require("redux");
const initialState = {};
const middleware = [thunk];
const rooted = redux.createStore;

const store = rooted(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
// initialState,
//composeWithDevTools(applyMiddleware(...middleware))

//import { createStore } from "redux";

export default store;
//import { createStore } from "redux";
// import { applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers/index";

// const initialState = {};
// const middleware = [thunk];
// export const store = createStore(rootReducer);

//  import
