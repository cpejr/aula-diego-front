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
            <div className='NewLiveFormBox'>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Título:</label>
                    <input/>
               </div>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Data:</label>
                    <input/>
                    <label className='NewLiveLabel'>Horário:</label>
                    <input/>
               </div>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Duração:</label>
                    <input/>
               </div>
               <div className='NewLiveInputLine'>
                    <label className='NewLiveLabel'>Descrição:</label>
                    <input/>
               </div>
            </div>
                </div>
                    </div>
        </div>
    )
}
