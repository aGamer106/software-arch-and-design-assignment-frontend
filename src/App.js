import logo from './logo.svg';
import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import '../src/static/css/home.css'
import '../src/static/util/call-centre-pic.jpg';
import HomeForm from "./components/HomeForm";
import {Button, TextField} from "@mui/material";
import {Form} from "react-router-dom";


function App(props) {



  return (
    <div>
        <Navbar/>
        <HomeForm/>
        <Footer/>
    </div>
  );
}

export default App;
