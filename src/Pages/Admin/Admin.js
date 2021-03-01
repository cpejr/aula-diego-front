import React from "react";
import Header from "../../Components/Header/Header";
import Base from "../../Components/Base/Base";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Admin.css";
import Cards from '../../Components//Cards/Cards'
import AdmCard from "../../Components/AdmCard/AdmCard";
import Foto from "../../images/samu.svg"
import {useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';


export default function Admin() {


  const history = useHistory();

  const routeChange = () =>{ 
    let path = '/'; 
    history.push(path);
  }


  return (
    <Base>
      <div className="Admincontainer">
        <div style={{flex:1,backgroundColor:'#fafafa'}}>
            <div className='DashboardTitle'>
            <img src={Foto} className='TitleImg'/>
            <h1 className='DashBoardTitleFont' >Próximas Lives</h1>
            </div>
             <div className = 'DashboardCardContainer' >
                <AdmCard title="Adicionar Nova Live" Icon={AddIcon} route="/newlive" />
                <Cards title='UPA' cardColor1 = '#6AA5E3'cardColor2='#686AE9' date = '20/10/2020' hour = '20:00' path={`/cadastro/aula?course=3acce2d3-f52a-4cf0-bdc3-38c2621e46ca`}/>
                <Cards title='Bombeiros' cardColor1 = '#FD88A4'cardColor2='#EE3763' date = '20/10/2020' hour = '20:00' />
            </div> 
            </div >
      </div>
    </Base>
  );
}
