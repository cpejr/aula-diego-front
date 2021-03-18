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
    const [classes, setClasses] = useState([]);
    const { session } = useSession();

    const configCourse = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        'course.organization_id': session.user.organization_id,
      },
    };  

    useEffect(() => {
      api
        .get(`/course/user/${session.user.id}`, configCourse)
        .then((response) => {

          console.log(response);
          setCourses(response.data);
        })
        .catch(() => {
          message.error("Não foi possível carregar dados dos cursos");

        });
    }, 
    []);

    function classesUser(value) {
      const config = {
        headers: {
          authorization: "BEARER " + session.accessToken,
        },
        params: {
          corse_id: value,
        },
      };
      if (value){
        api
          .get(`/class/user`, config)
          .then((response) => {
            console.log(response);
            setClasses(response.data);
          })
          .catch(() => {
            message.error("Não foi possível carregar dados das turmas");
          });
      }
    }
  
    
    return (
        <Base>
            <div className="Cursos">
                <div className="description">
                    <h1 className="TitleCursos"><BookOutlined />Meus Cursos</h1>
                    {courses
                        ? courses.map((course) => {
                            
                            return (
                                <CardCurso
                                    title={course.course_name}
                                    organization={course.organization_name}
                                    description={course.course_description}
                                    path={`/curso/${course.course_id}`}
                                />
                            );
                            
                        })
                    : null}
                </div>
            </div>
        </Base>
    );
}

function CardCurso({ title, organization, description, path }) {
    const history = useHistory();
    return (
        <div className="containerCursos">
            <div className="CardCursoTop">
                <h4 className="descriptionCurso"></h4> 
            </div>
            <div className="CardCursoBottom">
                <h3 className="TitleCurso">{title}</h3>
                <h5 className="subTitleCurso">{organization}</h5>
                <h6 className="subTitleCurso">{description}</h6>
                <div style={{textAlign: "right"}}>
                  <button className="btnVerCurso" onClick={() => history.push(path)}>
                      Ver Curso
                  </button>
                </div>
            </div>
        </div>
    );
  }