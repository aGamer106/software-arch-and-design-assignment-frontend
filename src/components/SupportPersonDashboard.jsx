import react from "react";
import '../static/css/support-dashboard.css'


function SupportPersonDashboard() {
    return (
        <div style={{ padding: "50px", color: "white", backgroundColor: "#3a6737", minHeight: "100vh" }}>
            <h1>Support Person Workspace</h1>
            <p>Welcome! Please check your registered email address for escalated tickets.</p>
            <p>Follow the instructions in the email to contact the consumer directly.</p>
        </div>
    );
}

export default SupportPersonDashboard;