import React, { useState,useContext,useEffect } from "react"
import "./TabelaTurmas.css"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


import Context from '../../Store/context'
import { CallToActionSharp } from "@material-ui/icons";




const DATA=[
  {
      name:'João Rivello',
      matricula:' 32131',
      ocupacao:'Bombeiro'
  },
  {
      name:'Daniel Benicá',
      matricula:' 78954',
      ocupacao:'SAMU'
  },
  {
      name:'Alexandre Rocha',
      matricula:'12345',
      ocupacao:'Nada'
  },
  {
      name:'Daniel Almeida',
      matricula:'58244',
      ocupacao:'UPA'
  },
  {
      name:'Hermon Barros',
      matricula:'56874',
      ocupacao:'Padre'

  },
  {
      name:'Andre Mattos',
      matricula:' 75542',
      ocupacao:'Pro-Player'
  },
  {
      name:'Pedro Gabriel',
      matricula:'18899',
      ocupacao:'SAMU'
  }
]





function LinhaTabelaTurmas(props) {

  const [dados,setDados]=useState(props.listaDeAlunos)

  const {state} = useContext(Context)



  function removeLine(matricula){

    console.log(matricula)
    let copy = [...dados]

    const filtrado = copy.filter(item=>{return(
      matricula != item.matricula 
    )})

      console.log(filtrado)
      setDados(filtrado)
  } 
    






  return (
    <div className='LinhaTabelaTurmas'>
      <p>{props.item.name}</p>
      <p>{props.item.matricula}</p>
      <div style={{display:'flex',alignItems:'center',maxWidth:'100%'}}>
      <p>{props.item.ocupacao} </p>
      <HighlightOffIcon style={{marginLeft:'-50px'}} onClick={()=>props.excluirLinha(props.item.matricula)} />
      </div>
      

    </div>
  );
}


const Tabela = ({search}) => {

    const [tempData,setTempData] = useState(DATA)
    const [teste,setTeste] = useState(tempData)
    




    useEffect(()=>{
        const filtered = users.filter(user => {
            
            return (
                user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
                || user.matricula.indexOf(search) !== -1 
                || user.ocupacao.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
            
        }) 
        setTeste(filtered)
     },[search,tempData])
    

     function excluirLinha(matricula){
        
        
    
        const filtrado = tempData.filter(item=>{return(
          matricula != item.matricula 
        )})
    
          console.log(filtrado)
          setTempData(filtrado)
     }



    const {state} = useContext(Context)

    
    
    const [users, setUsers] = useState(DATA)

    

     
     console.log('renderizei')
    return (
        <div>
            <div className="TabelaTurmasBox">
                <div className="LinhaBoard">
                    <p className='TabelaTurmasLabel'style={{borderBottom:'none'}}>Nome</p>
                    <p className='TabelaTurmasLabel'style={{borderBottom:'none'}}>Matrícula</p>
                    <p className='TabelaTurmasLabel'style={{borderRight:'none',borderBottom:'none'}}>Ocupação</p>
                </div>
                {tempData.map(item => { return (
        <LinhaTabelaTurmas key={item.matricula}  item ={item} excluirLinha={excluirLinha}/>
    )})}
            </div>
        </div>
    )
}

export default Tabela