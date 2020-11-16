import React from 'react'
import './ListaTurmas.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'




const data =[
    {
        ocupacao: 'SAMU',
        codigo: '251862',
        number: 34
    },
    {
        ocupacao: 'SAMU',
        codigo: '321312',
        number: 19
    },
    {
        ocupacao: 'UPA',
        codigo: '72483',
        number: 88
    }
]



function LinhaListaTurmas(props){
    return(
        <div className='LinhaListaTurmas'>
              <p>{props.ocupacao}</p>
              <p>{props.codigo}</p>
              <p>{props.number}</p>
              <p style={{paddingLeft:'6vw'}}>ICONE1</p>
              <p style={{paddingRight:'4vw'}}>ICONE2</p>
        </div>
    )
}




export default function ListaTurmas() {
    return (
        <div className='ListaTurmasContainer'>
            <Sidebar/>
            <div className='ListaTurmasContent'>
            <Header/>
            <div style={{display:'flex',flex:1,alignItems:'center',height:'30vh'}}>
            <h1 className='ListaTurmasTtitle'>Turmas</h1>
            </div>
            <div className='ListaTurmasLabel'>
                <p style={{}}>Ocupação</p>
                <p style={{marginLeft:'8%',marginRight:'8%',fontWeight:400}}>|</p>
                <p style={{}}>Código</p>
                <p style={{marginLeft:'8%',marginRight:'8%',fontWeight:400}}>|</p>
                <p style={{}}>Nº de Alunos</p>
            </div>

            <div className='ListaTurmasDataContainer'>
                {data.map(item=>{
                    return(
                        <LinhaListaTurmas id={item.codigo} ocupacao={item.ocupacao} codigo={item.codigo} number={item.number}/>
                    )
                })}
            </div>
            
            
        </div>
        </div>
    )
}
