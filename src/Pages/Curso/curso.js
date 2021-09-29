/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Divider, Card } from "antd";
import { VideoCameraOutlined, ReadOutlined } from '@ant-design/icons'
import "./curso.css";

export default function Curso(props) {
  const [course, setCourse] = useState();
  const [lives, setLives] = useState();
  const [lessons, setLessons] = useState();
  const [done, setDone] = useState();
  const [sorted, setSorted] = useState();

  const history = useHistory();

  const { session } = useSession();
  const { id } = props.match.params;
  const { Meta } = Card

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    }
  };

  const configQuery = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      course_id: id,
    }
  };

  let requests = 0

  const requestDone = (data) => {
    requests += 1;

    if (requests == 3)
      setDone(true);
  }

  useEffect(() => {
    if (done === true){
      const sLesson = lessons.sort((a, b) => a.date - b.date);
      const sLive = lives.sort((a, b) => a.date - b.date);
      const combined = sLesson.concat(sLive).sort((a, b) => a.date - b.date);
      
      setSorted(combined);
    }
  }, [done])

  useEffect(() => {
    api
      .get(`/course/${id}`, config)
      .then((response) => {
        setCourse(response.data);
        requestDone();
      })
      .catch((err) => {
      });

    api
      .get(`/live`, configQuery)
      .then((response) => {
        const lives = [];
        response.data.map(live => lives.push({
          ...live,
          "date": new Date(live.created_at)
        }));

        setLives(lives);
        requestDone();
      })
      .catch(() => {
      });

    api
      .get(`/lesson`, configQuery)
      .then((response) => {
        const lessons = [];
        response.data.map(lesson => lessons.push({
          ...lesson,
          "date": new Date(lesson.created_at)
        }));

        setLessons(lessons);
        requestDone();
      })
      .catch((err) => {
      });
  }, []);

  return (
    <Base>
      <div className="cursoBody">
        {course && <h1 className="cursoTitle">{course.name}</h1>}
        {months.map((month, idx) => {
          if (sorted !== undefined) {
            const found = true ? sorted.find(m => m.date.getMonth() === idx) !== undefined : false

            if (found) {    
              return (
                <>
                  <Divider orientation="left">{month}</Divider>
                  {sorted.map(element => {
                    if (element.date.getMonth() === idx) {
                      const icon = (element.confirmation_code !== undefined) ? <VideoCameraOutlined/> : <ReadOutlined/>
                      const path = (element.confirmation_code !== undefined) ? 'live' : 'aula'
                      const noDesc = <span style={{color: "gray", fontStyle: "italic"}}>Sem descrição</span>

                      return(
                        <Card hoverable className="card" size="small" onClick={() => history.push(`/${path}/${element.id}`)}>
                          <Meta title={element.name} avatar={icon} description={element.description !== null ? element.description : noDesc}/>

                        </Card>
                      )
                    }
                  })}
                </>
              )
            }
          }
        })}
      </div>
    </Base>
  );
}

// function CourseCard({ title, description, path }) {
//   const history = useHistory();
//   return (
//     <div className="course-card" onClick={() => history.push(path)}>
//       <h3 className="course-card-title capitalize">{title}</h3>
//       <p className="course-card-description">{description}</p>
//     </div>
//   );
// }
