import React from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Admin.css";
import Cards from '../../Components//Cards/Cards'
import AdmCard from "../../Components/AdmCard/AdmCard";



export default function Admin() {
  return (
      <div className="Admincontainer">
        <Sidebar />

        <div style={{flex:1}}>
            <Header /> 
             <div className = 'DashboardCardContainer' >
                <AdmCard  />
                <Cards title='UPA' cardColor = '#6AA5E3' date = '20/10/2020' hour = '20:00' />
                <Cards title='Bombeiros' cardColor = '#F97091' date = '20/10/2020' hour = '20:00' />
            </div> 
            </div >
      </div>
  );
}
