import React from "react";
import "./Curso.css";
import "./../TurmasAdmin/TurmasAdmin.css";
import Base from "../../Components/Base/Base";
import AdmCard from "../../Components/AdmCard/AdmCard";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

export default function Curso() {
  return (
    <Base>
      <div className="ContainerTurmasAdmin">
        <div className="TurmasAdmin">
          <h1 className="ContainerCardsTurmasAdmin">Criar novo Curso</h1>
          <div className="DashboardCardContainer">
            <AdmCard
              title="Novo Curso"
              Icon={AddIcon}
              route="/cadastro/curso"
            />
            <AdmCard
              title="Visualizar e Editar"
              Icon={EditIcon}
              route="/curso/editar"
            />
          </div>
        </div>
      </div>
    </Base>
  );
}
