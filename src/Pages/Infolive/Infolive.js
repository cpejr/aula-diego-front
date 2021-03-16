import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./Infolive.css";
import Base from "../../Components/Base/Base";
import InfoIcon from "@material-ui/icons/Info";
import { Table, Tag, Input, Tooltip, message } from "antd";
import AddIcon from "@material-ui/icons/Add";

export default function Infolive() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { session } = useSession();
  const history = useHistory();

  function dateFormate(date) {
    var data = new Date(date);
    return data.toLocaleDateString([], { dateStyle: "short" });
  }

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api
      .get(`/live`, config)
      .then((lives) => {
        setLives(lives.data);
        setFilteredData(lives.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das lives");
      });

    api
      .get(`/course`, config)
      .then((courses) => {
        setCourses(courses.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados dos cursos");
      });

    api
      .get(`/organization`, config)
      .then((organizations) => {
        setOrganizations(organizations.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados das organizações");
      });
  }, []);

  function espectadores(id) {
    var count = 0;

    const configPresence = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
      params: {
        live_id: id,
        confirmation: true,
      },
    };

    api
      .get(`/presence/live`, configPresence)
      .then(() => {
        count++;
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da presença das lives");
      });
    return count;
  }

  const columns = [
    {
      title: "Organização",
      align: "left",
      render: () => {
        return organizations
          ? organizations.map((organization) => {
              let color = organization.name.length > 3 ? "geekblue" : "green";
              color = organization.name.length > 4 ? "coral" : color;
              color = organization.name.length > 5 ? "volcano" : color;
              color = organization.name.length > 6 ? "turquoise" : color;
              color = organization.name.length > 7 ? "yellowgreen" : color;
              color = organization.name.length > 8 ? "salmon" : color;
              return organization.id === session.user.organization_id ? (
                <Tag
                  key={organization.name}
                  className="clickable"
                  color={color}
                  onClick={() => handleChange(organization.name)}
                >
                  {organization.name}
                </Tag>
              ) : null;
            })
          : null;
      },
    },
    {
      title: "Data",
      dataIndex: "date",
      align: "left",
      render: (date) => {
        return <p>{dateFormate(date)}</p>;
      },
    },
    {
      title: "Nº espectadores",
      dataIndex: "id",
      align: "left",
      className: "column-numEspec",
      render: (id) => {
        return espectadores(id);
      },
    },
    {
      title: "Curso",
      className: "column-course",
      dataIndex: "course_id",
      align: "left",
      key: "tags",
      render: (course) => {
        return courses
          ? courses.map((courses) => {
              let color = courses.name.length > 5 ? "geekblue" : "green";
              color = courses.name.length > 7 ? "coral" : color;
              color = courses.name.length > 9 ? "volcano" : color;
              color = courses.name.length > 12 ? "turquoise" : color;
              color = courses.name.length > 15 ? "yellowgreen" : color;
              color = courses.name.length > 17 ? "salmon" : color;

              return courses.id === course ? (
                <Tag
                  color={color}
                  key={courses.name}
                  className="clickable"
                  onClick={() => handleChange(courses.name)}
                >
                  {courses.name}
                </Tag>
              ) : null;
            })
          : null;
      },
    },
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => (
        <>
          <InfoIcon
            className="clickable"
            onClick={() => {
              history.push(`/live/presenca/${id}`);
            }}
          />
        </>
      ),
    },
  ];

  function handleInfo() {
    alert("HANDLEINFO ainda não faz nada. tururu");
  }

  function handleChange(value) {
    setSearch(value);

    // retorna os dados de acordo com o que estiver na barra de pesquisa
    setFilteredData(
      lives.filter((live) => {
        if (value === "") return live;
        return (
          live.organization.toLowerCase().includes(value.toLowerCase()) ||
          live.date.toLowerCase().includes(value.toLowerCase()) ||
          live.course.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }
  return (
    <Base>
      <h1 className="page-title">Informações sobre as Lives:</h1>
      <div className="table-container">
        <div style={{ display: "flex" }}>
          <Input
            className="search-input"
            placeholder="procurar por nome, matricula, curso"
            onChange={(e) => handleChange(e.target.value)}
            value={search}
          />
          <Tooltip title="Criar Live">
            <AddIcon
              style={{ height: "30px", width: "30px" }}
              className="clickable"
              onClick={() => history.push("/live/cadastro")}
            />
          </Tooltip>
        </div>
        <Table
          // title={() => `Lista de Ocupações da empresa ${organization}`}
          columns={columns}
          dataSource={filteredData}
          loading={loading}
        />
      </div>
    </Base>
  );
}
