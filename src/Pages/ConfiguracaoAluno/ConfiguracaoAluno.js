import React from "react";
import "./ConfiguracaoAluno.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";

const ConfiguracaoAluno = () => {
  return (
    <div className="ConfigAluno">
      <Sidebar />
      <div className="paginaConfigAluno">
        <Header />
        <div className="tituloConfigAluno">
          <p>Suas Informações:</p>
        </div>
        <div className="blocoConfigAluno">
          <div className="Listas">
            <div className="Lista1">
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Nome:</p>
                <p className="configAlunoOutput">Ana</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Empresa:</p>
                <p className="configAlunoOutput">CPE Jr.</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Data de Nascimento:</p>
                <p className="configAlunoOutput">05/02/2000</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Email:</p>
                <p className="configAlunoOutput">vitorbarros@cpejr.com.br</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Endereço:</p>
                <p className="configAlunoOutput">Rua Padre Hermon</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Estado:</p>
                <p className="configAlunoOutput">MG</p>
              </div>
            </div>
            <div className="Lista1">
            <div className="linhasConfigAluno">
                <p className="configAlunoInput">Sobrenome:</p>
                <p className="configAlunoOutput">Campana</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Ocupação:</p>
                <p className="configAlunoOutput">Samu</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Sexo</p>
                <p className="configAlunoOutput">Masculino</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Telefone:</p>
                <p className="configAlunoOutput">(31) 99999-9999</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Cidade:</p>
                <p className="configAlunoOutput">Belo Horizonte</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">CEP:</p>
                <p className="configAlunoOutput">99999-111</p>
              </div>
            </div>
          </div>
          <div className="acessarConfigAluno">
            <button className="buttonConfigAluno">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoAluno;
