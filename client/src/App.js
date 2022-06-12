// import logo from './logo.svg';
import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
 import Navbar from "./components/layout/Navbar";
import Landing from './components/layout/Landing';
import Login from "./auth/Login";
import Register from './auth/Register';

function App() {
  return (        
        <Routes>
          <Route exact path='/landing' element={<Navbar/>}>
            <Route path="" element={<Landing/>}/>            
          </Route>
          <Route exact path='/landing' element={<Navbar/>}>
            <Route path="login" element={<Login/>}></Route>
          </Route>
          <Route exact path='/landing' element={<Navbar/>}>
            <Route path="register" element={<Register/>}></Route>
          </Route>
          {/* <Route exact path="/login" element={<Login/>}></Route> */}
          
        </Routes>
  );
}

export default App;
