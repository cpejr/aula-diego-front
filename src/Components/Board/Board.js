import React, { useState } from "react"
import "./Board.css"

const Line = ({ values, button }) => {

    const renderButton = (button !== undefined ? true : false)

    return (
        <div className='LinhaBoard'>
            {values.map(item => {
                return (
                    <div className="tableCell">
                        <p>{item}</p>
                    </div>
                )
            })}
            {renderButton && <div className="tableCell">
                    {button}
                </div>
            }
        </div>
    )
}


const Board = ({ search, data, labels, button }) => {
    const filtered = data.filter(object => {
        const values = Object.values(object);

        return values.toString().toLowerCase().indexOf(search) !== -1
    })

    const Lista = filtered.map(item => {
        const values = Object.values(item)
        return (
            <Line key={values[0]} values={values} button={button}/>
        )
    });

    return (
        <div className="BoardContainer">
            <div className="LinhaBoard">
                {labels.map(column => {
                    return (
                        <div className="tableCell" style={{ minHeight: "15vh" }}>
                            <p style={{ borderWidth: "0px", fontSize: "25px", color: "#25003c" }}>{column}</p>
                        </div>
                    )
                })}
            </div>
            {Lista}
        </div>
    )
}

export default Board