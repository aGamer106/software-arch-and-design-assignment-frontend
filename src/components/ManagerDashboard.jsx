import React, { useEffect, useState } from "react";
import { Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import api from "../APIConfig";
import '../static/css/manager-dashboard.css';

function ManagerDashboard() {
    const navigate = useNavigate();
    const [manager, setManager] = useState(null);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/admin-login");
            return;
        }
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.role !== "HELP_DESK_MANAGER") {
            alert("Unauthorized access. Managers only.");
            navigate("/");
            return;
        }
        setManager(parsedUser);
        loadAnalytics();
    }, [navigate]);

    const loadAnalytics = async () => {
        try {
            const response = await api.get('/manager/analytics');
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading analytics:", error);
            setLoading(false);
        }
    };

    if (!manager) return <div>Loading Manager Portal...</div>;

    const chartSetting = {
        yAxis: [
            {
                label: 'Number of Tickets',
            },
        ],
        width: 800,
        height: 500,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };

    return (
        <div className="manager-dashboard">
            <div className="manager-header">
                <div>
                    <Typography variant="h4">Manager Analytics</Typography>
                    <Typography variant="subtitle1" style={{ opacity: 0.9 }}>
                        Welcome, {manager.name}
                    </Typography>
                </div>
                <Button variant="contained" style={{ backgroundColor: '#1565c0' }}>
                    + Create New Agent
                </Button>
            </div>

            <div className="chart-container-wrapper">
                <Paper elevation={3} className="chart-paper">
                    <Typography variant="h6" className="chart-title">
                        Agent Performance Overview
                    </Typography>

                    {loading ? (
                        <p>Loading Chart Data...</p>
                    ) : stats.length === 0 ? (
                        <p>No performance data available yet.</p>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <BarChart
                                dataset={stats}
                                xAxis={[{
                                    scaleType: 'band',
                                    dataKey: 'agentName',
                                    label: 'Help Desk Agent'
                                }]}
                                series={[
                                    {
                                        dataKey: 'solvedCount',
                                        label: 'Solved Tickets',
                                        color: '#2e7d32'
                                    },
                                    {
                                        dataKey: 'activeCount',
                                        label: 'Active/Forwarded',
                                        color: '#ef6c00'
                                    }
                                ]}
                                {...chartSetting}
                            />
                        </div>
                    )}
                </Paper>
            </div>
        </div>
    );
}

export default ManagerDashboard;