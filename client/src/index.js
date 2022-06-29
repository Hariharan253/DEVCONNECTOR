import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
//import { createStore } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
//import rootReducer from "./reducers/index.js";
import { BrowserRouter } from "react-router-dom";
import { LOGOUT } from "./action/types";
import store from "./store"; //setup store
//const s = configureStore({ rootReducer });
store.subscribe(() => console.log("Updated: ", store.getState()));
store.dispatch({ type: LOGOUT });
//import Dashboard from "./components/dashboard/Dashboard.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

// const App = () => {
//   return <div>HELLO</div>;
// };

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
