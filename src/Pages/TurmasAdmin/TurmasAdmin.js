import React from "react";
import "./TurmasAdmin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import AdmCard from "../../Components/AdmCard/AdmCard";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

export default function TurmasAdmin() {
  return (
    <div className="ContainerTurmasAdmin">
      <Sidebar />
      <div className="TurmasAdmin">
        <Header />
        <div className="ContainerCardsTurmasAdmin">
          <h1>Turma</h1>
          <div className="CardsTurmasAdmin">
            <AdmCard style={{marginRight: "100px"}} title="Nova Turma" Icon={AddIcon} route="/novaturma"/>
            <AdmCard style={{marginLeft: "100px"}} title="Visualizar e Editar" Icon={EditIcon} route="/listaturma"/>
          </div>
        </div>
      </div>
    </div>
  );
}
