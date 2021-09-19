/* eslint-disable eqeqeq */
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Burger from "../Burger/Burger";
import "./Header.css";
import LogoAluno from "../../images/reclass-aluno.svg";
import { Link, useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";

const Header = () => {
  let history = useHistory();
  const { session } = useSession();
  const { handleLogout } = useSession();

  // useEffect(() => {
  //   api
  //     .post("/score", { user_id: session.user.id }, config)
  //     .then((res) => setScore(res.data.score))
  //     .catch(() =>
  //       message.error("Não foi possível receber pontuação do usuário.")
  //     );
  // }, []);

  function redirect(path) {
    history.push(path);
  }
  return (
    <>
      {session.user.type != "student" ? (
        <div className="Sidebar">
          <Sidebar />
        </div>
      ) : (
        <div className="Sidebar show">
          <Sidebar />
        </div>
      )}
      <div className="headerBase">
        <Burger />
        {session.user.type === "student" ? (
          <>
            <Link to="/dashboard">
              <img
                style={{ marginLeft: "2vw", height: "100px" }}
                className="headerLogo"
                src={LogoAluno}
              ></img>
            </Link>
            {/*<div className="headerScore">
              <label>{session.user.name}</label>
              <p>{score} XP</p>
        </div>*/}
          </>
        ) : null}
        <div className="headerAlign">
          <a className="aHeader" onClick={() => redirect("/config")}>
            Minhas Informações
          </a>
          {session.user.type === "student" ? (
            <>
              <button
                className="buttonHeader"
                onClick={() => {
                  handleLogout();
                  history.push("/login");
                }}
              >
                SAIR
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
