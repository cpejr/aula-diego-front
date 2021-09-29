import React from 'react'
import './AdmCard.css'
import {useHistory} from 'react-router-dom'

export default function AdmCard({Icon, title, route}) {

    const history = useHistory();

    const routeChange = () =>{ 
      let path = `${route}`; 
      history.push(path);
    }

    return (
        <div className='AdmCardsContainer' onClick={routeChange}>
            <p style = {{fontSize: 24,marginBottom:30}}>
                {title}
            </p>
            <Icon style = {{fontSize: 70,fontWeight:700,paddingTop:-5}} />
        </div>
    )
}
