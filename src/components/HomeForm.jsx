import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../APIConfig";

function HomeForm(props) {
    const navigate = useNavigate();

    // State to store input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            // Send POST request to Spring Boot
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            // Check the response
            if (response.status === 200) {
                const role = response.data.role;

                if (role === "CONSUMER") {
                    // Save user info
                    localStorage.setItem("user", JSON.stringify(response.data));
                    // Redirect to the dashboard
                    navigate("/my-area");
                } else {
                    setError("This login is for Consumers only. Please use the Staff Portal.");
                }
            }
        } catch (err) {
            console.error("Login Error:", err);
            if (err.response && err.response.status === 401) {
                setError("Invalid Email or Password. Please try again.");
            } else {
                setError("Server error. Is the backend running?");
            }
        }
    };

    return (
        <div className={'consumer-login-form'}>
            <p>Welcome to our Complaint Management System.</p>

            <p>Access our support centre by logging in<br/>
                with your work email. We work with multiple<br/>
                businesses, therefore we need to know<br/>
                who you're working for so that we can provide<br/>
                best, most accurate targeted assistance<br/>
                to suit your needs.<br/>
            </p>

            <p>We'll need your work email and the password you<br/>
                used to create your account with us.</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Your Work / Former Registration Email:
                    <input
                        placeholder="Email..."
                        className={'txt-field'}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        placeholder="Password..."
                        className={'txt-field'}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                {/* Error Message Display */}
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                <div>
                    <Button variant="contained" type={'submit'} className={'button'}>
                        Proceed to MyArea →
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default HomeForm;