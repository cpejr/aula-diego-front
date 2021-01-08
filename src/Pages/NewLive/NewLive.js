import React, { useState } from "react";
import "./NewLive.css";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/Sidebar/Sidebar";

export default function NewLive() {
  const [state, setState] = useState({});

  function validateForm() {
    const inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; ++i) {
      if (!inputs[i].value || inputs[i].value == "") return false;
    }

    return true;
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm())
      return alert("Preencha todos os campos para criar uma nova live");

    const start_date = new Date(state["date"] + " " + state["time"]);
    const data = state;

    data["start_date"] = start_date;
    delete data["time"];

    //data is ready to be sent to the backend
  }

  return (
    <div className="NewLiveContainer">
      <div>
        <SideBar />
      </div>
      <div className="NewLiveContent">
        <Header />
        <div className="NewLiveFormContainer">
          <div style={{ width: "80%", marginBottom: "5vh" }}>
            <h1 className="NewLiveTitle">Nova Live</h1>
          </div>
          <div className="NewLiveFormBox">
            <form className="NewLiveForm">
              <div className="NewLiveInputLine">
                <label className="NewLiveLabel">Título:</label>
                <input
                  className="NewLiveTitleInput"
                  type="text"
                  placeholder="Digite o título da Live"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="NewLiveInputLine">
                <label className="NewLiveLabel">Data:</label>
                <input
                  className="NewLiveLabelDataInput"
                  type="date"
                  placeholder="DD/MM/AAAA"
                  name="date"
                  onChange={handleChange}
                />
                <label className="NewLiveLabel">Horário:</label>
                <input
                  className="NewLiveLabelTimeInput"
                  type="time"
                  name="time"
                  onChange={handleChange}
                />
                <label className="NewLiveLabel">Duração:</label>
                <input
                  className="NewLiveLabelTimeInput"
                  type="time"
                  name="duration"
                  onChange={handleChange}
                />
              </div>
              <div className="NewLiveInputLine">
                <label className="NewLiveLabel">Link:</label>
                <input
                  className="NewLiveLabelLinkInput"
                  type="text"
                  placeholder="Digite a URL da live"
                  name="live_link"
                  onChange={handleChange}
                />
              </div>
              <div className="NewLiveInputLine">
                <label className="NewLiveLabel">Código de Confirmação:</label>
                <input
                  className="NewLiveLabelCodeInput"
                  type="text"
                  placeholder="Digite o código de confirmação"
                  name="confirmation_code"
                  onChange={handleChange}
                />
              </div>
              <div className="NewLiveInputLine">
                <label className="NewLiveLabel">Descrição:</label>
                <textarea
                  placeholder="Digite a descrição da live, com informações e assuntos a serem abordados"
                  className="NewLiveLabelDescriptionInput"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="NewLiveButtonContainer">
                <input
                  type="button"
                  className="NewLiveButton"
                  value="CONCLUIR"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
