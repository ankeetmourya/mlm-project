// src/App.js
import React from "react";
import Tree from "./components/Tree";
import treeData from "./components/treeSample";
import "./App.css"; // Import the CSS file for custom styles
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state)=> state.auth.authData) || JSON.parse(localStorage.getItem("user"));
 console.log(user);
  return (
    <BrowserRouter>
    {/* <Navbar /> */}

    <Routes>
     
      {user && Object.keys(user).length > 0
      ? <>
      <Route path='*' element={<ErrorPage/>}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/' element={<Navbar component={'dashboard'}/>}></Route>
      <Route path='/dashboard' element={<Navbar component={'dashboard'} />}></Route>
      <Route path='/network' element={<Navbar component={'network'} />}></Route>
      <Route path='/register' element={<Navbar component={'register'} />}></Route>
      <Route path='/epin' element={<Navbar component={'epin'} />}></Route>
      <Route path='/products' element={<Navbar component={'products'} />}></Route>
      <Route path='/reports' element={<Navbar component={'reports'} />}></Route>
      </>
      : <>
       <Route path='*' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      </>}
      
    </Routes>
  </BrowserRouter>
  );
};

export default App;
