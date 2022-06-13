// import logo from './logo.svg';
import "./App.css";
import React, { Fragment } from "react";
// import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
// import Developers from "./components/layout/Developers";

//redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path='/landing' element={<Navbar />}>
          <Route path='' element={<Landing />} />
        </Route>
        <Route exact path='/landing' element={<Navbar />}>
          <Route path='login' element={<Login />}></Route>
        </Route>
        <Route exact path='/landing' element={<Navbar />}>
          <Route path='register' element={<Register />}></Route>
        </Route>
        <Route exact path='/landing' element={<Navbar />}>
          <Route path='developers' element={<Developers />}></Route>
        </Route>
        {/* <Route exact path="/login" element={<Login/>}></Route> */}
      </Routes>
    </Provider>
  );
}

export default App;
