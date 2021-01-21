import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/index";
import Live from "./Pages/Live/Live";
import Admin from "./Pages/Admin/Admin";
import Newlive from "./Pages/NewLive/NewLive";
import Cadastro from "./Pages/Cadastro/Cadastro";
import ListaAlunos from "./Pages/ListaAlunos";
import ListaTurma from "./Pages/ListaTurmas/ListaTurmas";
import NovaTurma from "./Pages/NovaTurma/NovaTurma";
import ConfigAluno from "./Pages/ConfiguracaoAluno/ConfiguracaoAluno";
import TabelaTurmas from "./Pages/TabelaTurmas/TabelaTurmas";
import TurmasAdmin from "./Pages/TurmasAdmin/TurmasAdmin";
import Infolive from "./Pages/Infolive/Infolive";
import ListaAlunosLive from "./Pages/ListaAlunosLive/ListaAlunosLive";
const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path="/" />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={Live} exact path="/live" />
        <Route component={Admin} exact path="/admin" />
        <Route component={Newlive} exact path="/newlive" />
        <Route component={Cadastro} exact path="/cadastro" />
        <Route component={ListaAlunos} exact path="/listaAlunos"></Route>
        <Route component={NovaTurma} exact path="/novaturma" />
        <Route component={ConfigAluno} exact path="/config-aluno" />
        <Route component={ListaTurma} exact path="/listaturma" />
        <Route component={TurmasAdmin} exact path="/turmasadmin" />
        <Route component={TabelaTurmas} exact path="/tabelaturmas" />
        <Route component={Infolive} exact path="/infolive" />
        <Route component={ListaAlunosLive} exact path="/listalive" />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
