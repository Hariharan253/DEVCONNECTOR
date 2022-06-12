// import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
 import Navbar from "./components/layout/Navbar";
import Landing from './components/layout/Landing';
import Login from "./auth/Login";
import Register from './auth/Register';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Landing/>}></Route> 
          <Route exact path='/login' element={<Login/>}>
          </Route>
          <Route exact path='/register' element={<Register/>}>          
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
