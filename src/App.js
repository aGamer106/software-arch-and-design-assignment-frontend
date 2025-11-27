import logo from './logo.svg';
import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import '../src/static/css/home.css'


function App(props) {
  return (
    <div>
        <Navbar/>
        <Footer/>
    </div>
  );
}

export default App;
