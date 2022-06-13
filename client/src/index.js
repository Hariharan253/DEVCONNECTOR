import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
//import './index.css';
//import App from "./App";
//import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Developers from "./components/layout/Developers";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Fragment>
      <h1>HI</h1>
    </Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

//const mainNode = document.getElementById("quoter");
//ReactDOM.render(<App />, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
