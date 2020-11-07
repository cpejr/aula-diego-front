import React from 'react'
import './AdmCard.css'
import {useHistory} from 'react-router-dom'


export default function AdmCard() {

    const history = useHistory();

    const routeChange = () =>{ 
      let path = '/newlive'; 
      history.push(path);
    }



    return (
        <div className='AdmCardsContainer' onClick={routeChange}>
            <p style = {{fontSize: 24,marginBottom:0}}>
                Adicionar Nova Live
            </p>
            <h1 style = {{fontSize: 120,fontWeight:700,paddingTop:-5}} > + </h1>
        </div>
    )
}
