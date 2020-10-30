import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import Header from "../../Components/Header/Header"
import "./index.css"


const Dashboard = () => {
    return (
        <div className = 'Teste' style={{display: "flex"}}>
           
            <Sidebar />
<<<<<<< HEAD
            <Header />
=======
            <div style={{flex:1}}>
            <Header /> 
             <div className = 'DashboardCardContainer'>
                <Cards title='SAMU' cardColor = '#A564E5' date = '20/10/2020' hour = '20:00'/>
                <Cards title='UPA' cardColor = '#6AA5E3' date = '20/10/2020' hour = '20:00' />
                <Cards title='Bombeiros' cardColor = '#F97091' date = '20/10/2020' hour = '20:00' />
            </div> 
            </div >

>>>>>>> 785a501085ddcfdc0dedfed7fc393ff171d26842
        </div>
        
    )
}

export default Dashboard;