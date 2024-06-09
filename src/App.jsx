// src/App.js
import React from "react";
import Tree from "./components/Tree";
import treeData from "./components/treeSample";
import "./App.css"; // Import the CSS file for custom styles
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}

    <Routes>
      <Route path='/' element={<Navbar />}></Route>
      <Route path='/dashboard' element={<Navbar component={'dashboard'} />}></Route>
      <Route path='/register' element={<Navbar component={'register'} />}></Route>
    </Routes>
  </BrowserRouter>
  );
};

export default App;
