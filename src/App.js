import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './static/css/home.css';
import './static/util/call-centre-pic.jpg';
import HomeForm from "./components/HomeForm";
import ConsumerDashboard from "./components/ConsumerDashboard";
import {BrowserRouter} from "react-router-dom";

// --- THE FIX IS HERE ---
// You must import 'BrowserRouter' and alias it as 'Router'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(props) {
    return (
        // This 'Router' is now actually 'BrowserRouter'
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    {/* Route for the Consumer Login (Home) */}
                    <Route path="/" element={<HomeForm />} />

                    {/* Route for the Consumer Dashboard (Protected) */}
                    <Route path="/my-area" element={<ConsumerDashboard />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;