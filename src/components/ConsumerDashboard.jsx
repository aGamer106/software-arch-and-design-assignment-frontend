import React, { useEffect, useState } from "react";
import {
    Button, Card, CardContent, Typography, Fab,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../APIConfig";
import '../static/css/my-area.css';

function ConsumerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [open, setOpen] = useState(false);
    const [newComplaint, setNewComplaint] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchComplaints(parsedUser.id);
    }, [navigate]);

    const fetchComplaints = (userId) => {
        api.get(`/consumer/complaints/${userId}`)
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => console.error("Error fetching complaints:", error));
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint({ ...newComplaint, [name]: value });
    };

    const handleSubmitComplaint = async () => {
        if (!user) return;

        try {
            await api.post(`/consumer/complaints/${user.id}`, newComplaint);
            fetchComplaints(user.id);
            setNewComplaint({ title: "", description: "" });
            handleClose();
        } catch (error) {
            console.error("Failed to log complaint:", error);
            alert("Failed to submit complaint. Please try again.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>My Area</h1>
            </div>

            {user && <h3 className="welcome-message">Welcome back, {user.name}</h3>}

            <h2 className="section-title">My Complaints</h2>

            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <div className="complaints-list">
                    {complaints.slice().reverse().map((complaint) => (
                        <Card key={complaint.id} variant="outlined" className="complaint-card">
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {complaint.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} className="status-text">
                                    Status: <strong className="status-label">{complaint.status}</strong> | Date: {complaint.submissionDate}
                                </Typography>
                                <Typography variant="body2" className="complaint-desc">
                                    {complaint.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <div className="fab-container">
                <Fab
                    className="custom-fab"
                    aria-label="add"
                    onClick={handleClickOpen}
                >
                    <span className="material-symbols-outlined">+</span>
                </Fab>
            </div>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Log a New Complaint</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Complaint Title (e.g., Billing Issue)"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newComplaint.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Describe your problem in detail..."
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newComplaint.description}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmitComplaint} variant="contained" color="primary">
                        Submit Ticket
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConsumerDashboard;