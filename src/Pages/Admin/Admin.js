import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { message } from "antd";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./Admin.css";


export default function Admin() {

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);

  const { session } = useSession();
  const history = useHistory();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    }
  };

  const configFile = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  useEffect(() => {
    api
      .get(`/user`, {...config, params: { "user.organization_id": session.user.organization_id }})
      .then(response => setStudents(response.data))
      .catch(err => { message.error("Não foi possível carregar dados das aulas"); })

    api
      .get(`/course`, {...config, params: { organization_id: session.user.organization_id }})
      .then(response => {
        const list = []

        Promise.allSettled(response.data.map(course => course.id).map(id => {
          api
            .get(`/course/${id}/all`, config)
            .then(response => { list.push(...response.data); Promise.resolve() })
            .catch(err => { message.error("Não foi possível carregar dados das aulas"); })
        }))
        .then(() => {setActivities(/* list.map(item => new Date(item.created_at)) */list)})
        
        setCourses(response.data);
      })
      .catch(err => { message.error("Não foi possível carregar dados das aulas"); })

  }, []);

  console.log(courses)
  console.log(activities)

  return (
    <Base>
    </Base>
  );
}
