import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import Header from "../../Components/Header/Header"
import Cards from "../../Components/Cards/Cards"
import "./index.css"


const Dashboard = () => {
    
    return (
    
        <div className = 'Teste' style={{display: "flex"}}>
            <Sidebar />
            <div style={{flex: 1}}>
            <Header /> 
            <h1>Próximas Lives:</h1>
             <div className = 'DashboardCardContainer'>
                <Cards title='SAMU' cardColor = '#A564E5' date = '20/10/2020' hour = '20:00'/>
                <Cards title='UPA' cardColor = '#6AA5E3' date = '20/10/2020' hour = '20:00' />
                <Cards title='Bombeiros' cardColor = '#F97091' date = '20/10/2020' hour = '20:00' />
            </div> 
            </div >

        </div>
        
    )
}

export default Dashboard;