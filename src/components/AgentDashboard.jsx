import React, { useEffect, useState } from "react";
import { Button, Typography, Chip, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import api from "../APIConfig";
import '../static/css/agent-dashboard.css';

function AgentDashboard() {
    const navigate = useNavigate();
    const [agent, setAgent] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [message, setMessage] = useState("");

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/admin-login");
            return;
        }
        const parsedAgent = JSON.parse(storedUser);
        if (parsedAgent.role !== "HELP_DESK_AGENT") {
            alert("Unauthorized access");
            navigate("/");
            return;
        }
        setAgent(parsedAgent);
        loadTickets();
    }, [navigate]);

    const loadTickets = async () => {
        try {
            const response = await api.get(`/agent/complaints/all`);
            setComplaints(response.data);
        } catch (error) {
            console.error("Error loading work:", error);
        }
    };

    const handleGetNextTicket = async () => {
        try {
            await api.post(`/agent/assign/${agent.id}`);
            setMessage("New ticket assigned!");
            loadTickets();
        } catch (error) {
            setMessage("Could not assign ticket. Queue empty or you are busy.");
        }
    };

    const handleRowClick = (params) => {
        setSelectedTicket(params.row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTicket(null);
    };

    const handleMarkSolved = async () => {
        if (!selectedTicket) return;
        try {
            await api.put(`/agent/complaints/${selectedTicket.id}/solve`);
            setMessage("Ticket closed successfully!");
            loadTickets();
            handleClose();
        } catch (error) {
            console.error(error);
            setMessage("Error updating ticket.");
        }
    };

    const handleEscalate = async () => {
        if (!selectedTicket) return;
        try {
            await api.post(`/agent/complaints/${selectedTicket.id}/escalate`);
            setMessage(`Ticket escalated! Email sent to Support.`);
            handleClose();
        } catch (error) {
            console.error("Escalation failed:", error);
            setMessage("Failed to send escalation email. Check backend logs.");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === 'SOLVED' ? 'success' : 'warning'}
                    size="small"
                />
            )
        },
        { field: 'title', headerName: 'Subject', width: 250 },
        {
            field: 'consumerName',
            headerName: 'Consumer',
            width: 150,
            renderCell: (params) => params.row.consumer?.name || 'Unknown'
        },
        {
            field: 'consumerPhone',
            headerName: 'Phone',
            width: 150,
            renderCell: (params) => params.row.consumer?.phoneNumber || 'N/A'
        },
        { field: 'submissionDate', headerName: 'Date', width: 120 },
    ];

    if (!agent) return <div>Loading...</div>;

    return (
        <div className="agent-dashboard">
            <div className="agent-header">
                <Typography variant="h4">Agent Workspace</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontSize='16px'>Logged in as: {agent.name}</Typography>
                    {/*<Button variant="contained" onClick={handleGetNextTicket} style={{ backgroundColor: '#1976d2' }}>*/}
                    {/*    Pull Next Ticket*/}
                    {/*</Button>*/}
                </div>
            </div>

            {message && (
                <Alert severity="info" onClose={() => setMessage("")} style={{ marginBottom: 20 }}>
                    {message}
                </Alert>
            )}

            <div style={{ height: 420, width: '100%', borderRadius: 8, backgroundColor: 'white' }}>
                <DataGrid
                    rows={complaints}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    onRowClick={handleRowClick}
                    disableRowSelectionOnClick
                />
            </div>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                {selectedTicket && (
                    <>
                        <DialogTitle style={{ backgroundColor: '#1976d2', color: 'white' }}>
                            Ticket #{selectedTicket.id}: {selectedTicket.title}
                        </DialogTitle>
                        <DialogContent style={{ marginTop: 20 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="textSecondary">Consumer Name</Typography>
                                    <Typography variant="body1">{selectedTicket.consumer?.name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="textSecondary">Contact Phone</Typography>
                                    <Typography variant="body1">{selectedTicket.consumer?.phoneNumber}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="textSecondary" style={{ marginTop: 10 }}>Description</Typography>
                                    <div style={{ padding: 15, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                                        <Typography variant="body1">{selectedTicket.description}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">Close</Button>
                            <Button onClick={handleEscalate} color="error" variant='outlined'>
                                Send to Support Person
                            </Button>
                            {selectedTicket.status !== 'SOLVED' && (
                                <Button onClick={handleMarkSolved} variant="contained" color="success">
                                    Mark as Solved
                                </Button>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}

export default AgentDashboard;