import React from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Admin.css";
import Cards from '../../Components//Cards/Cards'
import AdmCard from "../../Components/AdmCard/AdmCard";
import Foto from "../../images/samu.svg"
import {useHistory} from 'react-router-dom'


export default function Admin() {


  const history = useHistory();

  const routeChange = () =>{ 
    let path = '/'; 
    history.push(path);
  }


  return (
      <div className="Admincontainer">
        <div className='AdminSideBar'>
        <Sidebar />
        </div>
        

        <div style={{flex:1,backgroundColor:'#fafafa'}}>
            <Header /> 
            <div className='DashboardTitle'>
            <img src={Foto} className='TitleImg'/>
            <h1 className='DashBoardTitleFont' >Próximas Lives</h1>
            </div>
             <div className = 'DashboardCardContainer' >
                <AdmCard  />
                <Cards title='UPA' cardColor = '#6AA5E3' date = '20/10/2020' hour = '20:00' />
                <Cards title='Bombeiros' cardColor = '#F97091' date = '20/10/2020' hour = '20:00' />
            </div> 
            </div >
      </div>
  );
}
