import React, { useState } from "react";
import "./NewLive.css";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

const generateCode = () => {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  for (let i = 0; i < 6; i++)
    code += characters[Math.floor(Math.random() * characters.length)];

  return code;
}

export default function NewLive() {
  const [state, setState] = useState({});
  const [date, setDate] = useState(null);
  const [confirmation, setConfirmation] = useState(generateCode());

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

    const data = {...state, "date": date, "confirmation_code": confirmation};  

    api
      .post("/newlive", data)
      .then(() => setState({}))
      .catch((err) => alert(`Não foi possível criar live \n ${err}`));
  }

  return (
  <Base>
    <div className="pageRoot">
      <div>
      </div>
      <div className="pageBody">
        <div className="pageContent">
          <div className="pageTitle">
            <h1>Criar Live</h1>
          </div>
          <div className="formWrapper">
            <form className="liveForm">
              <div className="inputLine">
                <div className="inputWrapper">
                  <label>Título:</label>
                  <input
                    type="text"
                    placeholder="Digite o título da Live"
                    name="title"
                    onChange={handleChange}
                  />
                </div>

              </div>
              <div className="inputLine">
                <div className="inputWrapper">
                  <label>Data:</label>
                  <DatePicker
                    width="100%"
                    className="form-control"
                    id="exampleInputAddress"
                    name="birthdate"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="Selecione data"
                    locale="br"
                    required
                  />
                </div>
                <div className="inputWrapper">
                  <label>Horário:</label>
                  <input
                    type="time"
                    name="time"
                    onChange={handleChange}
                  />
                </div>
                <div className="inputWrapper">
                  <label>Duração:</label>
                  <input
                    type="time"
                    name="duration"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="inputLine">
                <div className="inputWrapper">
                  <label>Link:</label>
                  <input
                    type="text"
                    placeholder="Digite a URL da live"
                    name="live_link"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="inputLine">
                <div className="inputWrapper">
                  <label>Descrição:</label>
                  <textarea
                    placeholder="Digite a descrição da live, com informações e assuntos a serem abordados"
                    name="description"
                    onChange={handleChange}
                    rows="1"
                  />
                </div>
              </div>
              <div className="inputLine">
                <div className="inputWrapper">
                  <label>Codigo de Confirmação:</label>
                  <span>{confirmation}</span>
                </div>
              </div>
              <div className="buttonWrapper">
                <input
                  type="button"
                  className="formButton"
                  value="CONCLUIR"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Base>
  );
}
