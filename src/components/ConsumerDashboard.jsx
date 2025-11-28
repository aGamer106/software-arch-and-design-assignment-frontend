import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../APIConfig"; // <--- FIXED: Relative path

function ConsumerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Fetch Complaints for this specific consumer
        api.get(`/consumer/complaints/${parsedUser.id}`)
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => {
                console.error("Error fetching complaints:", error);
            });

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div style={{ padding: "50px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>My Area</h1>
                <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
            </div>

            {user && <h3>Welcome back, {user.name}</h3>}

            <h2>My Complaints</h2>

            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {complaints.map((complaint) => (
                        <Card key={complaint.id} variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {complaint.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Status: <strong>{complaint.status}</strong> | Date: {complaint.submissionDate}
                                </Typography>
                                <Typography variant="body2">
                                    {complaint.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ConsumerDashboard;