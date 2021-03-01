import React from "react";
import Base from "../../Components/Base/Base";
import { BookOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import "./MeusCursos.css";

export default function MeusCursos() {
    return (
        <Base>
            <div className="Cursos">
                <div className="containerCursos">
                    <h1 className="TitleCursos"><BookOutlined />Meus Cursos</h1>
                </div>
            </div>
        </Base>
    );
}