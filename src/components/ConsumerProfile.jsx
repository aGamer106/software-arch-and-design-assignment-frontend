import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import '../static/css/consumer-profile.css';

function ConsumerProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
    }, [navigate]);

    if (!user) {
        return <div className="profile-container">Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Your Details, {user.name}</h2>
            </div>

            <div className="profile-fields-row">
                <TextField
                    disabled
                    className="profile-field"
                    label="Full Name"
                    value={user.name || ""}
                    variant="filled"
                    fullWidth
                />

                <TextField
                    disabled
                    className="profile-field"
                    label="Email Address"
                    value={user.email || ""}
                    variant="filled"
                    fullWidth
                />

                <TextField
                    disabled
                    className="profile-field"
                    label="Password"
                    type="password"
                    value="********"
                    variant="filled"
                    fullWidth
                />
            </div>
        </div>
    )
}

export default ConsumerProfile;