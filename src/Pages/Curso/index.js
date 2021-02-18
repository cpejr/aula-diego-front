import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "../../Context/SessionContext";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import "./curso.css";
import { message } from "antd";

export default function Curso(props) {
  const { session } = useSession();
  const [courseData, setCourseData] = useState();
  const [lives, setLives] = useState();
  const [lessons, setLessons] = useState();
  const { id } = props.match.params;
  const configCourse = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    params: {
      course_id: id,
    },
  };

  useEffect(() => {
    api
      .get(`/course/${id}`, configCourse)
      .then((response) => {
        setCourseData(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados do curso");
      });

    api
      .get(`/live`, config)
      .then((response) => {
        setLives(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das lives");
      });

    api
      .get(`/lesson`, config)
      .then((response) => {
        setLessons(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das aulas");
      });
  }, []);
  return (
    <Base>
      <div className="page-content">
        <h1 className="mb60 capitalize">{courseData && courseData.name}</h1>
        <p className="mb60 block">{courseData && courseData.description}</p>
        <h2 className="mb20 capitalize">Últimas Lives</h2>
        <div className="course-card-container mb20">
          {lives
            ? lives.map((live) => {
                return (
                  <CourseCard
                    className="capitalize"
                    title={live.name}
                    description={live.description}
                    path={`/live/${live.id}`}
                  />
                );
              })
            : null}
        </div>
        <h2 className="mb20 capitalize">Últimas Aulas</h2>
        <div className="course-card-container">
          {lessons
            ? lessons.map((lesson) => {
                return (
                  <CourseCard
                    className="capitalize"
                    title={lesson.name}
                    description={lesson.description}
                    path={`/lesson/${lesson.id}`}
                  />
                );
              })
            : null}
        </div>
      </div>
    </Base>
  );
}

function CourseCard({ title, description, path }) {
  const history = useHistory();
  return (
    <div className="course-card" onClick={() => history.push(path)}>
      <h3 className="course-card-title capitalize">{title}</h3>
      <p className="course-card-description">{description}</p>
    </div>
  );
}
