import React from 'react';
import "./Cards.css"
import {useHistory} from 'react-router-dom'

const Cards = (props) => {
    const history = useHistory()

    function redirect(){
        history.push('/live')
    }

    return (
        <div onClick={redirect} className='cardsContainer' style = {{"backgroundImage":`linear-gradient(to right,${props.cardColor1},${props.cardColor2})`}} >
            <p style = {{fontSize: 14}}>
                Live {props.date}
            </p>
            <p style = {{fontSize: 34}}>
                {props.title}
            </p>
            <p style = {{fontSize: 16}}>
                Às {props.hour}
            </p>
        </div>
    )
}

export default Cards;