import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import Header from "../../Components/Header/Header"
import Cards from "../../Components/Cards/Cards"
import "./index.css"
import Foto from "../../images/samu.svg"


const Dashboard = () => {
    
    return (
<<<<<<< HEAD
    
        <div className = 'Teste' style={{display: "flex"}}>
=======
        <div className = 'Teste' style={{display: "flex",backgroundColor:'#fafafa'}}>
           
>>>>>>> 8622007062f7fe7698fb560a203b73f3610be442
            <Sidebar />
            <div style={{flex: 1}}>
            <Header /> 
<<<<<<< HEAD
            <h1>Próximas Lives:</h1>
=======
            <div className='DashboardTitle'>
            <img src={Foto} className='TitleImg'/>
            <h1 style={{fontWeight:600}}>Próximas Lives</h1>
            </div>
>>>>>>> 8622007062f7fe7698fb560a203b73f3610be442
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