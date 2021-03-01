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
import ListaAlunosTurma from "./Pages/ListaAlunosTurma/ListaAlunosTurma";
import TurmasAdmin from "./Pages/TurmasAdmin/TurmasAdmin";
import Infolive from "./Pages/Infolive/Infolive";
import ForgottenPassword from "./Pages/ForgottenPassword/forgot";
import ListaAlunosLive from "./Pages/ListaAlunosLive/ListaAlunosLive";
import CadastroOrganizacao from "./Pages/CadastroOrganizacao";
import CadastroOcupacao from "./Pages/CadastroOcupacao/CadastroOcupacao";
import ListaOcupacoes from "./Pages/ListaOcupacoes/ListaOcupacoes";
import ListaCursos from "./Pages/ListaCursos/ListaCursos";
import Curso from "./Pages/Curso/curso";
import MeusCursos from "./Pages/MeusCursos/MeusCursos";
import Aula from "./Pages/Aula/Aula";
import NovaAula from "./Pages/NovaAula/NovaAula";
import Sobre from "./Pages/Sobre/Sobre";
import ListaOrganizacao from "./Pages/ListaOrganizacoes/ListaOrganizacoes";

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <IsLoggedRoute
          component={Sobre}
          exact
          path="/"
          loggedPath="/dashboard"
        />
        <IsLoggedRoute
          component={Login}
          exact
          path="/login"
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
          component={ForgottenPassword}
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
          path="/live/:id"
          exact
          studentComponent={Live}
          adminComponent={Live}
          masterComponent={Live}
        />
        <PrivateRoute
          path="/cadastro/live"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={Newlive}
          masterComponent={Newlive}
        />
        <PrivateRoute
          path="/aluno"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunos}
          masterComponent={ListaAlunos}
        />
        <PrivateRoute
          path="/info/live"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={Infolive}
          masterComponent={Infolive}
        />
        <PrivateRoute
          path="/cadastro/turma"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={NovaTurma}
          masterComponent={NovaTurma}
        />
        <PrivateRoute
          path="/gerenciar/curso"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={GerenciarCurso}
          exact
        />
        <PrivateRoute
          path="/cadastro/curso"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={NovoCurso}
          masterComponent={NovoCurso}
        />
        <PrivateRoute
          path="/lista/turma"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaTurma}
          masterComponent={ListaTurma}
        />
        <PrivateRoute
          path="/gerenciar/turma"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={TurmasAdmin}
          masterComponent={TurmasAdmin}
        />
        <PrivateRoute
          path="/alunos/turma"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunosTurma}
          masterComponent={ListaAlunosTurma}
        />
        <PrivateRoute
          path="/presenca/live/:live_id"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunosLive}
          masterComponent={ListaAlunosLive}
        />
        <PrivateRoute
          path="/organizacao"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={ListaOrganizacao}
        />
        <PrivateRoute
          path="/cadastro/organizacao"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={CadastroOrganizacao}
        />
        <PrivateRoute
          path="/ocupacao"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={ListaOcupacoes}
        />
        <PrivateRoute
          path="/cadastro/ocupacao"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={CadastroOcupacao}
        />
        <PrivateRoute
          path="/curso"
          exact
          studentComponent={MeusCursos}
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
        <PrivateRoute
          path="/aula/:id"
          exact
          studentComponent={Aula}
          adminComponent={Aula}
          masterComponent={Aula}
        />
        <PrivateRoute
          path="/cadastro/aula"
          exact
          studentComponent={NovaAula}
          adminComponent={NovaAula}
          masterComponent={NovaAula}
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
