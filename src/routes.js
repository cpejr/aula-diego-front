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
import CursoAdmin from "./Pages/CursoAdmin/cursoAdmin";
import NovoCurso from "./Pages/NovoCurso/NovoCurso";
import ConfigUser from "./Pages/ConfiguracaoUser/ConfiguracaoUser";
import ListaAlunosTurma from "./Pages/ListaAlunosTurma/ListaAlunosTurma";
import TurmasAdmin from "./Pages/TurmasAdmin/TurmasAdmin";
import Infolive from "./Pages/Infolive/Infolive";
import ForgottenPassword from "./Pages/ForgottenPassword/forgot";
import ListaAlunosLive from "./Pages/ListaAlunosLive/ListaAlunosLive";
import CadastroOrganizacao from "./Pages/CadastroOrganizacao/CadastroOrganizacao";
import CadastroOcupacao from "./Pages/CadastroOcupacao/CadastroOcupacao";
import ListaOcupacoes from "./Pages/ListaOcupacoes/ListaOcupacoes";
import ListaCursos from "./Pages/ListaCursos/ListaCursos";
import Curso from "./Pages/Curso/curso";
import MeusCursos from "./Pages/MeusCursos/MeusCursos";
import Aula from "./Pages/Aula/Aula";
import NovaAula from "./Pages/NovaAula/NovaAula";
import Sobre from "./Pages/Sobre/Sobre";
import ListaOrganizacao from "./Pages/ListaOrganizacoes/ListaOrganizacoes";
import usuariosPendentes from "./Pages/UsuariosPendentes/usuariosPendentes";
import Parceiros from "./Pages/Parceiros/Parceiros";
import EditarLive from "./Pages/EditarLive/EditarLive";

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
        <PrivateRoute
          path="/config"
          exact
          studentComponent={ConfigUser}
          adminComponent={ConfigUser}
          masterComponent={ConfigUser}
        />
        /* LIVE */
        <PrivateRoute
          path="/live/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={Newlive}
          masterComponent={Newlive}
        />
        <PrivateRoute
          path="/live/info"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={Infolive}
          masterComponent={Infolive}
        />
        <PrivateRoute
          path="/live/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={EditarLive}
          masterComponent={EditarLive}
        />
        <PrivateRoute
          path="/live/presenca/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunosLive}
          masterComponent={ListaAlunosLive}
        />
        <PrivateRoute
          exact
          path="/live/:id"
          studentComponent={Live}
          adminComponent={Live}
          masterComponent={Live}
        />
        /* TURMA */
        <PrivateRoute
          path="/turma/lista"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaTurma}
          masterComponent={ListaTurma}
        />
        <PrivateRoute
          path="/turma/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={NovaTurma}
          masterComponent={NovaTurma}
        />
        <PrivateRoute
          path="/turma/alunos"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunosTurma}
          masterComponent={ListaAlunosTurma}
        />
        /* CURSO */
        <PrivateRoute
          path="/curso/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={NovoCurso}
          masterComponent={NovoCurso}
        />
        <PrivateRoute
          path="/curso/lista"
          studentComponent={MeusCursos}
          adminComponent={MeusCursos}
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
          path="/curso/gerenciar/:id"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={CursoAdmin}
          masterComponent={CursoAdmin}
        />
        /* AULA */
        <PrivateRoute
          path="/aula/cadastro"
          studentComponent={NovaAula}
          adminComponent={NovaAula}
          masterComponent={NovaAula}
        />
        <PrivateRoute
          path="/aula/:id"
          exact
          studentComponent={Aula}
          adminComponent={Aula}
          masterComponent={Aula}
        />
        /* ORGANIZAÇÃO */
        <PrivateRoute
          path="/organizacao/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={CadastroOrganizacao}
        />
        <PrivateRoute
          path="/organizacao"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={ListaOrganizacao}
        />
        /* OCUPAÇÃO */
        <PrivateRoute
          path="/ocupacao/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={CadastroOcupacao}
        />
        <PrivateRoute
          path="/ocupacao"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={ListaOcupacoes}
        />
        <PrivateRoute
          path="/aluno"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={ListaAlunos}
          masterComponent={ListaAlunos}
        />
        <PrivateRoute
          path="/usuarios/pendentes"
          exact
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={usuariosPendentes}
          masterComponent={usuariosPendentes}
        />
        <PrivateRoute
          path="/parceiros"
          exact
          studentComponent={Parceiros}
          adminComponent={Parceiros}
          masterComponent={Parceiros}
        />
        <PrivateRoute
          path="/sobre"
          exact
          studentComponent={Sobre}
          adminComponent={Sobre}
          masterComponent={Sobre}
        />
        <PrivateRoute
          path="/"
          component={() => <h1> Erro 404: Página não encontrada </h1>}
        />{" "}
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
