import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../../images/logoTeste.png";
import { useSession } from "../../Context/SessionContext";
import Foto from "../../images/foto.jpg";
import { Link, useHistory } from "react-router-dom";
import ListaAlunos from "../../Pages/ListaAlunos/ListaAlunos";

export default function Sidebar() {

  const history = useHistory();
  const { session } = useSession();
  const { handleLogout } = useSession();
  const studentList = [
    {
      title: "Live",
      path: "/live",
    },
    {
      title: "Informações sobre a Live",
      path: "/infolive",
    },
  ];
  const adminLinks = [
    {
      title: "Nova Live",
      path: "/live",
    },
    {
      title: "Lista de Alunos",
      path: "/listaalunos",
    },
    {
      title: "Informações sobre a live",
      path: "/infolive",
    },
    {
      title: "Lista de Presença",
      path: "/listalive",
    },
  ];

  const masterLinks = [
    {
      title: "Novo Usuário",
      path: "/cadastro",
    },
    {
      title: "Lista de Alunos",
      path: "/listaalunos",
    },
    {
      title: "Informações sobe a live",
      path: "/infolive",
    },
    {
      title: "Nova Turma",
      path: "/novaturma",
    },
    {
      title: "Lista de Turma",
      path: "/listaTurma",
    },
    {
      title: "Turmas",
      path: "/listaTurma",
    },
    {
      title: "Lista de Turmas",
      path: "/tabelaturma",
    },
    {
      title: "Novo Curso",
      path: "/novocurso",
    },
    {
      title: "Lista de Presença",
      path: "/listalive",
    },
  ];
  const [linksList, setLinksList] = useState(studentList);

  useEffect(() => {
    if (session && session.user) {
      switch (session.user.type) {
        case "student":
          setLinksList(studentList);
          break;

        case "admin":
          setLinksList(adminLinks);
          break;
        case "master":
          setLinksList(masterLinks);
          break;
        default:
          setLinksList(studentList);
          break;
      }
    }
  }, []);
  return (
    <div className="sidebarContainer">
      <div className="logoContainer">
        <div className="imgContainer">
          <Link to="/dashboard">
            <img src={Logo}></img>
          </Link>
        </div>
      </div>

      <div className="sidebarPerfil">
        <img src={Foto} />
        <br></br>
        <label>{session.user.name}</label>
        <br></br>
      </div>

      <div className="sidebarBody">
        <ul>
          {linksList.map((link) => {
            return (
              <li className="ul-link">
                <Link to={link.path}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="sidebarButtonContainer">
          <button
            className="sidebarButton"
            onClick={() => {
              handleLogout();
              history.push("/");
            }}
          >
            SAIR
          </button>
        </div>
      </div>
    </div>
  );
}
