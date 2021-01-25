import React, { useState } from "react"
import "./Board.css"

const LinhaBoard = ({values}) =>  {
    return (
        <div onClick={()=>alert(values[0])} className='LinhaBoard'>
            {values.map(item => {
                return (
                    <div className="tableCell">
                        <p>{item}</p>
                    </div>
                )
            })}
        </div>
    )
}


const Board = ({search, data, labels}) => {

    const [users, setUsers] = useState(data)
    const [open, setOpen] = useState(false)

    const filtered = users.filter(user => {
        return (
            user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
            || user.matricula.indexOf(search) !== -1 
            || user.curso.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
    })

    const Lista = filtered.map(item => {
        const values = Object.values(item) 
        return (
            <LinhaBoard key={values[0]} values={values} />
        )
    });

    return (
        <div className="BoardContainer">
            <div className="LinhaBoard">
                {labels.map(column => {
                    return (
                        <div className="tableCell" style={{minHeight: "15vh"}}>
                            <p style={{borderWidth: "0px", fontSize: "25px", color:"#25003c"}}>{column}</p>
                        </div>
                    )
                })}
            </div>
            {Lista}
        </div>
    )
}

export default Board