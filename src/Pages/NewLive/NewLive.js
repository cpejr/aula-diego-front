import React from 'react'
import './NewLive.css'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/Sidebar/Sidebar'

export default function NewLive() {



    return (
        <div className='NewLiveContainer'>
            <div>
                <SideBar/>
            </div>
            <div className='NewLiveContent'>
            <Header/>
            <div className='NewLiveFormContainer'>
            <div style={{width:'80%',marginBottom:'5vh'}}>
            <h1 className='NewLiveTitle'>Nova Live</h1>
            </div>
            <div className='NewLiveFormBox'>
                <form className='NewLiveForm'>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Título:</label>
                    <input className='NewLiveTitleInput'type='text' placeholder='Digite o título da Live'/>
               </div>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Data:</label>
                    <input className='NewLiveLabelDataInput' type='text'placeholder='DD/MM/AAAA' />
                    <label className='NewLiveLabel'>Horário:</label>
                    <input className='NewLiveLabelTimeInput' type='time'/>
                    <label className='NewLiveLabel'>Duração:</label>
                    <input className='NewLiveLabelTimeInput' type='time'/>
               </div>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Link:</label>
                    <input className='NewLiveLabelLinkInput'type='text' placeholder='Digite a URL da live'/>
               </div>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Descrição:</label>
                    <textarea placeholder='Digite a descrição da live, com informações e assuntos a serem abordados' className='NewLiveLabelDescriptionInput'/>
               </div>
               <div className='NewLiveButtonContainer'>
                   <input type='button'className='NewLiveButton' value='CONCLUIR' onClick={()=>alert('Dados Enviados Com Sucesso!')}/>
               </div>
               </form>
            </div>
                </div>
                    </div>
        </div>
    )
}
