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
import AdminLoginPage from "./components/AdminLoginPage";
import ManagerDashboard from "./components/ManagerDashboard";
import AgentDashboard from "./components/AgentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import SupportPersonDashboard from "./components/SupportPersonDashboard";

function App(props) {
    return (

        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomeForm />} />
                    <Route path="/profile" element={<ConsumerProfile />} />
                    <Route path="/my-area" element={<ConsumerDashboard />} />
                    <Route path="/admin-login" element={<AdminLoginPage />} />
                    <Route path="/agent-dashboard" element={<AgentDashboard />} />
                    <Route path="/support-dashboard" element={<SupportPersonDashboard />} />
                    <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                    <Route path="/admin-panel" element={<AdminDashboard />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;