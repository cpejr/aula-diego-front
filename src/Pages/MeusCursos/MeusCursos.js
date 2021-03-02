import React from "react";
import Base from "../../Components/Base/Base";
import { BookOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import "./MeusCursos.css";

export default function MeusCursos() {
    return (
        <Base>
            <div className="Cursos">
            <h1 className="TitleCursos"><BookOutlined />Meus Cursos</h1>
                <div className="containerCursos">
                    <div className="CardCursoRight">
                        <h1 className="TitleCurso">Programação Orientada a Objetos</h1>
                        <div className="videoAula">
                            
                        </div>  
                    </div>
                    <div className="CardCursoLeft">
                        <h4 className="descriptionCurso">Programação orientada a objetos é um paradigma de programação baseado no conceito de "objetos", que podem conter dados na forma de campos, também conhecidos como atributos, e códigos, na forma de procedimentos, também conhecidos como métodos.</h4>
                        <div className="videoAula">
                            
                        </div>  
                    </div>
                </div>
            </div>
        </Base>
    );
}