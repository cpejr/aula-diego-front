import React, { useEffect, useState } from "react";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import Base from "../../Components/Base/Base";
import { BookOutlined } from '@ant-design/icons';
import { message } from 'antd';
import "./MeusCursos.css";

export default function MeusCursos() {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState([]);
    const { session } = useSession();
    const history = useHistory();

    const config = {
        headers: {
        authorization: "BEARER " + session.accessToken,
        },
    };

    useEffect(() => {
        api
          .get(`/user/${session.user.id}`, config)
          .then((response) => {
            setUser(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados do usuário");
          });
        
        api
          .get(`/course`, config)
          .then((response) => {
            setCourses(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados dos cursos");
          });
        }, 
      []);
    
    return (
        <Base>
            <div className="Cursos">
                <div className="description">
                    <h1 className="TitleCursos"><BookOutlined />Meus Cursos</h1>
                    {courses
                        ? courses.map((course) => {
                        return (
                            <div className="containerCursos">
                                <div className="CardCursoTop">
                                    <h4 className="descriptionCurso"></h4> 
                                </div>
                                <div className="CardCursoBottom">
                                    <h3 className="TitleCurso">{course.name}</h3>
                                    <h6 className="subTitleCurso">{course.organization_id}</h6>
                                    <h6 className="subTitleCurso">{course.description}</h6>
                                    <button className="btnVerCurso" onClick={() => history.push(`/curso/${course.id}`)}>
                                        Ver Curso
                                    </button>
                                </div>
                            </div>
                        );
                        })
                    : null}
                </div>
            </div>
        </Base>
    );
}