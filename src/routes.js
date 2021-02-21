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
import GerenciarCurso from "./Pages/GerenciarCursos/Curso";
import NovoCurso from "./Pages/NovoCurso/NovoCurso";
import ConfigUser from "./Pages/ConfiguracaoUser/ConfiguracaoUser";
import TabelaTurmas from "./Pages/TabelaTurmas/TabelaTurmas";
import TurmasAdmin from "./Pages/TurmasAdmin/TurmasAdmin";
import Infolive from "./Pages/Infolive/Infolive";
import ForgottenPassword from "./Pages/ForgottenPassword/forgot";
import ListaAlunosLive from "./Pages/ListaAlunosLive/ListaAlunosLive";
import CadastroOrganizacao from "./Pages/CadastroOrganizacao";
import CadastroOcupacao from "./Pages/CadastroOcupacao/index";
import ListaOcupacoes from "./Pages/ListaOcupacoes";
import ListaCursos from "./Pages/ListaCursos";
import Curso from "./Pages/Curso";

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
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={Cadastro}
          component={Cadastro} // (opcional) componente que renderiza se não estiver logado
        />
        <PrivateRoute
          path="/forgottenpassword"
          studentComponent={ForgottenPassword}
          adminComponent={ForgottenPassword}
          masterComponent={ForgottenPassword}
          component = {ForgottenPassword}
        />
        <PrivateRoute
          path="/dashboard"
          exact
          studentComponent={Dashboard}
          adminComponent={Admin}
          masterComponent={Admin}
        />
        /* REVISAR */
        <PrivateRoute
          path="/newlive"
          exact
          studentComponent={Newlive}
          adminComponent={Newlive}
          masterComponent={Newlive}
        />
        <PrivateRoute
          path="/config"
          exact
          studentComponent={ConfigUser}
          adminComponent={ConfigUser}
          masterComponent={ConfigUser}
        />
        <PrivateRoute
          path="/live"
          exact
          studentComponent={Live}
          adminComponent={Newlive}
          masterComponent={Infolive} // mudar depois
        />
        <PrivateRoute
          path="/aluno"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunos}
          masterComponent={ListaAlunos} // isso vai ser alterado depois -> pagina em que o master poderá excluir alunos
        />
        <PrivateRoute
          path="info/live"
          exact
          studentComponent={Infolive}
          adminComponent={Infolive}
          masterComponent={Infolive}
        />
        <PrivateRoute
          path="cadastro/turma"
          exact
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={NovaTurma}
        />
        <PrivateRoute
          path="/gerenciar/curso"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={GerenciarCurso}
          exact
        />
        <PrivateRoute
          path="/cadastro/curso"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={NovoCurso}
        />
        <PrivateRoute
          path="/listaturma"
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={ListaTurma}
          masterComponent={ListaTurma}
        />
        <PrivateRoute
          path="/gerenciar/turma"
          exact
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={TurmasAdmin}
          masterComponent={TurmasAdmin}
        />
        <PrivateRoute
          path="/alunos/turma/:id"
          exact
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={TabelaTurmas}
          masterComponent={TabelaTurmas}
        />
        <PrivateRoute
          path="/presenca/live"
          exact
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={ListaAlunosLive}
          masterComponent={ListaAlunosLive}
        />
        <PrivateRoute
          path="/cadastro/organizacao"
          exact
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={() => <Redirect to="dashboard" />}
          masterComponent={CadastroOrganizacao}
        />
        <PrivateRoute
          path="/ocupacao"
          exact
          studentComponent={() => <Redirect to="dashboard" />}
          adminComponent={ListaOcupacoes}
          masterComponent={ListaOcupacoes}
        />
        <PrivateRoute
          path="/cadastro/ocupacao"
          exact
          studentComponent={CadastroOcupacao}
          adminComponent={CadastroOcupacao}
          masterComponent={CadastroOcupacao}
        />
        <PrivateRoute
          path="/curso"
          exact
          studentComponent={ListaCursos}
          adminComponent={ListaCursos}
          masterComponent={ListaCursos}
        />
        <PrivateRoute
          path="/curso/:id"
          exact
          studentComponent={Curso}
          adminComponent={Curso}
          masterComponent={Curso}
        />
        <Route
          path="/"
          component={() => <h1> Erro 404: Página não encontrada </h1>}
        />{" "}
        {/* Rota para caminhos desconhecidos no sistema */}
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
