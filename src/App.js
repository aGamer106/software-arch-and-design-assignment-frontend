import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './static/css/home.css';
import './static/util/call-centre-pic.jpg';
import HomeForm from "./components/HomeForm";
import ConsumerDashboard from "./components/ConsumerDashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsumerProfile from "./components/ConsumerProfile";

function App(props) {
    return (

        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomeForm />} />
                    <Route path="/profile" element={<ConsumerProfile />} />
                    <Route path="/my-area" element={<ConsumerDashboard />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;