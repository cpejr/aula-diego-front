import React from "react";
import {Route, BrowserRouter} from "react-router-dom"
import Login from "./Pages/Login/Login"
import Dashboard from "./Pages/Dashboard/index"
import Live from "./Pages/Live/Live"
import Admin from "./Pages/Admin/Admin";
import Newlive from './Pages/NewLive/NewLive'
import Cadastro from './Pages/Cadastro/Cadastro'
import ListaAlunos from "./Pages/ListaAlunos";

import NovaTurma from './Pages/NovaTurma/NovaTurma'
import ConfigAluno from './Pages/ConfiguracaoAluno/ConfiguracaoAluno'

const routes = () => {
    return(
        <BrowserRouter>
            <Route component = {Dashboard} exact path="/dashboard"/>
            <Route component = {Login} exact path = "/"/>
            <Route component = {Live} exact path = "/live"/>
            <Route component={Admin} exact path='/admin'/> 
            <Route component={Newlive} exact path='/newlive'/> 
            <Route component={Cadastro} exact path='/cadastro'/>
            <Route component={ListaAlunos} exact path = '/listaAlunos'></Route>
            <Route component={NovaTurma} exact path='/novaturma'/>
            <Route component={ConfigAluno} exact path='/config-aluno'/>
        </BrowserRouter>
    )   
}

export default routes;
