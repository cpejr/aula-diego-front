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
import NovaAtividade from "./Pages/NovaAtividade/NovaAtividade";
import Atividade from "./Pages/Atividade/Atividade";
import AtividadeResultado from "./Pages/AtividadeResultado/AtividadeResultado";
import AtividadeResposta from "./Pages/AtividadeResposta/AtividadeResposta";
import AtividadeLista from "./Pages/AtividadeLista/AtividadeLista";
import Comentario from "./Pages/Comentario/Comentario";
import EditarLive from "./Pages/EditarLive/EditarLive";
import EditarOcupacao from "./Pages/EditarOcupacao/EditarOcupacao";
import EditarCurso from "./Pages/EditarCurso/EditarCurso";
import EditarTurma from "./Pages/EditarTurma/EditarTurma";
import EditarAula from "./Pages/EditarAula/EditarAula";
import EditarOrganizacao from "./Pages/EditarOrganizacao/EditarOrganizacao";

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
        <PrivateRoute
          path="/live/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={EditarLive}
          masterComponent={EditarLive}
        />
        /* TURMA */
        <PrivateRoute
          path="/turma/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={EditarTurma}
          masterComponent={EditarTurma}
        />
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
          path="/curso/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={EditarCurso}
          masterComponent={EditarCurso}
        />
        <PrivateRoute
          path="/curso/cadastro"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={NovoCurso}
          masterComponent={NovoCurso}
        />
        <PrivateRoute
          path="/curso"
          exact
          studentComponent={MeusCursos}
          adminComponent={MeusCursos}
          masterComponent={MeusCursos}
        />
        <PrivateRoute
          path="/curso/lista"
          studentComponent={() => <Redirect to="/dashboard" />}
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
          path="/curso/gerenciar/:id"
          exact
          studentComponent={Dashboard}
          adminComponent={CursoAdmin}
          masterComponent={CursoAdmin}
        />
        /* AULA */
        <PrivateRoute
          path="/aula/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={EditarAula}
          masterComponent={EditarAula}
        />
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
        /* PROVA */
        <PrivateRoute
          path="/aula/editar/:id"
          exact
          studentComponent={Dashboard}
          adminComponent={EditarAula}
          masterComponent={EditarAula}
        />
        <PrivateRoute
          path="/atividade/cadastro"
          exact
          studentComponent={Dashboard}
          adminComponent={NovaAtividade}
          masterComponent={NovaAtividade}
        />
        <PrivateRoute
          path="/atividade/resposta/:id"
          exact
          studentComponent={Dashboard}
          adminComponent={AtividadeResposta}
          masterComponent={AtividadeResposta}
        />
        <PrivateRoute
          path="/atividade/responder/:id"
          exact
          studentComponent={Atividade}
          adminComponent={Atividade}
          masterComponent={Atividade}
        />
        <PrivateRoute
          path="/atividade/resultado/:id"
          exact
          studentComponent={AtividadeResultado}
          adminComponent={AtividadeResultado}
          masterComponent={AtividadeResultado}
        />
        <PrivateRoute
          path="/atividade/lista/:id"
          exact
          studentComponent={AtividadeLista}
          adminComponent={AtividadeLista}
          masterComponent={AtividadeLista}
        />
        /* ORGANIZAÇÃO */
        <PrivateRoute
          path="/organizacao/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={() => <Redirect to="/dashboard" />}
          masterComponent={EditarOrganizacao}
        />
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
          path="/ocupacao/editar/:id"
          studentComponent={() => <Redirect to="/dashboard" />}
          adminComponent={EditarOcupacao}
          masterComponent={EditarOcupacao}
        />
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
          studentComponent={ListaAlunos}
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
          path="/sobre"
          exact
          studentComponent={Sobre}
          adminComponent={Sobre}
          masterComponent={Sobre}
        />
        /* COMENTÁRIO */
        <PrivateRoute
          path="/comentario/:id"
          exact
          studentComponent={Comentario}
          adminComponent={Comentario}
          masterComponent={Comentario}
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
