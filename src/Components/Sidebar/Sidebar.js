import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../../images/logoTeste.png";
import { useSession } from "../../Context/SessionContext";
import Foto from "../../images/foto.jpg";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Sidebar() {
  const history = useHistory();
  const { session } = useSession();
  const { handleLogout } = useSession();
  const [score, setScore] = useState("0 XP");

  const config = {
    headers: {
      authorization: "Bearer " + session.accessToken,
    },
  };

  const studentList = [
    {
      title: "Meus Cursos",
      path: "/curso/lista",
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
      title: "Turmas",
      path: "/turma/lista",
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

      /* api
        .post("/score", { user_id: session.user.id }, config)
        .then((res) => setScore(res.data.score))
        .catch(() => alert("Não foi possível receber pontuação do usuário.")); */
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
        <br></br>
        <label>{session.user.name}</label>
        <br></br>
      </div>

      <div className="sidebarScore">
        <p>{score} XP</p>
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
