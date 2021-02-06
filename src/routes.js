import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import IsLoggedRoute from "./Routes/IsLoggedRoute";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/index";
import Live from "./Pages/Live/Live";
import Admin from "./Pages/Admin/Admin";
import Newlive from "./Pages/NewLive/NewLive";
import Cadastro from "./Pages/Cadastro/Cadastro";
import ListaAlunos from "./Pages/ListaAlunos/ListaAlunos";
import ListaTurma from "./Pages/ListaTurmas/ListaTurmas";
import NovaTurma from "./Pages/NovaTurma/NovaTurma";
import ConfigUser from "./Pages/ConfiguracaoUser/ConfiguracaoUser";
import TabelaTurmas from "./Pages/TabelaTurmas/TabelaTurmas";
import TurmasAdmin from "./Pages/TurmasAdmin/TurmasAdmin";
import Infolive from "./Pages/Infolive/Infolive";
import ListaAlunosLive from "./Pages/ListaAlunosLive/ListaAlunosLive";
import CadastroOrganizacao from "./Pages/CadastroOrganizacao";

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <IsLoggedRoute
          component={Login}
          exact
          path="/"
          loggedPath="/dashboard"
        />
        <PrivateRoute
          path="/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={Cadastro}
          component={Cadastro} // (opcional) componente que renderiza se não estiver logado
        />
        <PrivateRoute
          path="/dashboard"
          studentComponent={Dashboard}
          adminComponent={Admin}
          masterComponent={Admin}
        />
        <PrivateRoute
          path="/config"
          studentComponent={ConfigUser}
          adminComponent={ConfigUser}
          masterComponent={ConfigUser}
        />
        <PrivateRoute
          path="/live"
          studentComponent={Live}
          adminComponent={Newlive}
          masterComponent={Infolive} // mudar depois
        />
        <PrivateRoute
          path="/listaalunos"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunos}
          masterComponent={ListaAlunos} // isso vai ser alterado depois -> pagina em que o master poderá excluir alunos
        />
        <PrivateRoute
          path="/infolive"
          studentComponent={Infolive}
          adminComponent={Infolive}
          masterComponent={Infolive}
        />
        <PrivateRoute
          path="/novaturma"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={NovaTurma}
        />
        <PrivateRoute
          path="/listaturma"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={ListaTurma}
        />
        <PrivateRoute
          path="/turmasadmin"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={TurmasAdmin}
        />
        <PrivateRoute
          path="/tabelaturma"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={TabelaTurmas}
          masterComponent={TabelaTurmas}
        />
        <PrivateRoute
          path="/listalive"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={ListaAlunosLive}
          masterComponent={ListaAlunosLive}
        />
        <PrivateRoute
          path="/cadastroorganizacao"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={CadastroOrganizacao}
        />
        <Route path="/" component={() => <Redirect to="dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
