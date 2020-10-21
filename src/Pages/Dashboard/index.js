import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import Header from "../../Components/Header/Header"
import "./index.css"

const Dashboard = () => {
    return (
        <div className = 'Teste' style={{display: "flex"}}>
            <Sidebar />
            <Header />
        </div>
    )
}

export default Dashboard;