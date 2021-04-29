import React from "react";
import "./CardCurso.css";
import { useHistory } from "react-router-dom";


export default function CardCurso({ title, organization, description, path }) {
  const history = useHistory();
  return (
    <div className="containerCursos">
      <div className="CardCursoTop">
        <h4 className="descriptionCurso"></h4>
      </div>
      <div className="CardCursoBottom">
        <h3 className="TitleCurso">{title}</h3>
        <h5 className="subTitleCurso">{organization}</h5>
        <h6 className="subTitleCurso">{description}</h6>
        <div className='buttonCardCourse'>
          <button className="btnVerCurso" onClick={() => history.push(path)}>
            Ver Curso
          </button>
        </div>
      </div>
    </div>
  );
}
