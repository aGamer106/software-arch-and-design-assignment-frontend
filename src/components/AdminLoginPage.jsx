import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../APIConfig";
import '../static/css/admin-login.css';

function AdminLoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            if (response.status === 200) {
                const user = response.data;
                const role = user.role;

                localStorage.setItem("user", JSON.stringify(user));

                switch(role) {
                    case "HELP_DESK_AGENT":
                        alert("Login Successful! Redirecting to Agent Dashboard...");
                        // navigate("/agent-dashboard"); // We will build this next
                        break;
                    case "HELP_DESK_MANAGER":
                        alert("Login Successful! Redirecting to Manager Dashboard...");
                        // navigate("/manager-dashboard");
                        break;
                    case "ADMIN":
                        alert("Login Successful! Redirecting to Admin Panel...");
                        // navigate("/admin-panel");
                        break;
                    case "CONSUMER":
                        setError("This portal is for Staff only. Please use the Home page.");
                        localStorage.removeItem("user");
                        break;
                    default:
                        setError("Unknown role. Please contact support.");
                }
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className='admin-login-container'>
            <div className="admin-login-card">
                <h2>Staff Portal Login</h2>
                <p className="admin-description">
                    Depending on your role (Help Desk Agent, Manager,
                    Support Person, or System Administrator), please login using this
                    secure portal.
                </p>

                <form onSubmit={handleLogin}>
                    <div className='credential-fields'>
                        <div className="field-group">
                            {/* Material UI Filled Variant */}
                            <TextField
                                id="email"
                                label="Admin/HDM/HDA/SP Email Address"
                                variant="filled"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field-group">
                            <TextField
                                id="password"
                                label="Password"
                                variant="filled"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="login-button-container">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            style={{backgroundColor: '#1976d2', padding: '10px 40px'}}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLoginPage;