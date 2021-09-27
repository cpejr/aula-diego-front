import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../../images/reclas.svg";
import { useSession } from "../../Context/SessionContext";
import { Link, useHistory } from "react-router-dom";

export default function Sidebar() {
  const history = useHistory();
  const { session } = useSession();
  const { handleLogout } = useSession();

  const studentList = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];
  const adminLinks = [
    {
      title: "Alunos",
      path: "/aluno",
    },
    {
      title: "Informações sobre a live",
      path: "/live/info",
    },
    {
      title: "Cursos",
      path: "/curso/lista",
    },
  ];

  const masterLinks = [
    {
      title: "Alunos",
      path: "/aluno",
    },
    {
      title: "Informações sobre a live",
      path: "/live/info",
    },
    {
      title: "Cursos",
      path: "/curso/lista",
    },
    {
      title: "Organizações",
      path: "/organizacao",
    },
    {
      title: "Ocupações",
      path: "/ocupacao",
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="sidebarContainer">
      <div className="logoContainer">
        <div className="imgContainer">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo"/>
          </Link>
        </div>
      </div>

      <div className="sidebarPerfil">
        <br></br>
        <h6>{session.user.name}</h6>
        <br></br>
      </div>
      {session.user.type === "student" ? (
        <div className="sidebarScore">
          <p>{session.user.score * 20} XP</p>
        </div>
      ) : null}

      <div className="sidebarBody">
        <ul>
          {linksList.map((link) => {
            return (
              <li className="ul-link">
                <Link to={link.path}>{link.title}</Link>
              </li>
            );
          })}
          <div className="configSidebar">
            <li className="ul-link">
              <Link to="/config">Minhas Informações</Link>
            </li>
          </div>
        </ul>
        <div className="sidebarButtonContainer">
          <button
            className="sidebarButton"
            onClick={() => {
              handleLogout();
              history.push("/login");
            }}
          >
            SAIR
          </button>
        </div>
      </div>
    </div>
  );
}
