import React from "react";
import "./TurmasAdmin.css";
import Base from "../../Components/Base/Base";
import AdmCard from "../../Components/AdmCard/AdmCard";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

export default function TurmasAdmin() {
  return (
    <Base>
      <div className="ContainerTurmasAdmin">
        <div className="TurmasAdmin">
          <h1 className="ContainerCardsTurmasAdmin">Turmas</h1>
          <div className="DashboardCardContainer">
            <AdmCard
              title="Nova Turma"
              Icon={AddIcon}
              route="/gerenciar/turma"
            />
            <AdmCard
              title="Visualizar e Editar"
              Icon={EditIcon}
              route="/lista/turma"
            />
          </div>
        </div>
      </div>
    </Base>
  );
}
