import React from "react";
import "./ListaAulas.css";
import Base from "../../Components/Base/Base";

import { Steps, Divider } from 'antd';
const { Step } = Steps;

export default function Aulas() {
  return (
    <Base>
      <div className="Aula">
        <div className="AulaContainer">
            <h1 className="TitleAulas">Programação Orientada a Objetos</h1>
            <div className="ListaAulas">
            <Steps current={1} percent={60} direction="vertical">
              <Step status="finish" title="Concluído" subTitle="Aula 01" description="REVISÃO DA LINGUAGEM C++ (NIVELAMENTO)" />
              <Step status="finish" title="Concluído" subTitle="Aula 02" description="SOBRECARGA, CONSTANTES, INLINE E STATIC" />
              <Step status="process" title="Em progresso" subTitle="Aula 03" description="REFERENCIAS, CONSTRUTOR COPIA, THIS" />
              <Step status="process" title="Em progresso" subTitle="Aula 04" description="SOBRECARGA DE OPERADORES" />
              <Step status="process" title="Em progresso" subTitle="Aula 05" description="CLASSES TEMPLATE E TRATAMENTO DE EXCEÇÕES" />
              <Step status="process" title="Em progresso" subTitle="Aula 06" description="COMPOSIÇÃO E HERANÇA DE CLASSES" />
              <Step status="process" title="Em progresso" subTitle="Aula 07" description="POLIMORFISMO E FUNÇÕES VIRTUAIS" />
              <Step status="process" title="Em progresso" subTitle="Aula 08" description="CLASSES ABSTRATAS" />
              <Step status="wait" title="Sem dados" subTitle="Aula 09" description="CONSOLIDAÇÃO DE CONHECIMENTO (ÚLTIMA PRÁTICA)" />
              <Step status="wait" title="Sem dados" subTitle="Aula 10" description="RECUPERAÇÃO DE ATIVIDADE PRÁTICA" />
            </Steps>
            </div>
        </div>
      </div>
    </Base>
  );
}