import React from "react";
import "./CardCurso.css";
import { useHistory } from "react-router-dom";

export default function CardCurso({ title, organization, description, path }) {
  const history = useHistory();
  return (
    <div className="containerCursos">
      <div className="CardCursoTop"></div>
      <div className="CardCursoBottom">
        <h3 className="TitleCurso">{title}</h3>
        <h6 className="subTitleCurso">{organization}</h6>
        <h6 className="subTitleCurso" style={{ fontSize: "12px" }}>
          {description}
        </h6>
        <div style={{ textAlign: "right", marginTop: "auto" }}>
          <button className="btnVerCurso" onClick={() => history.push(path)}>
            Ver Curso
          </button>
        </div>
      </div>
    </div>
  );
}
