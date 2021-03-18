import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import "./ConfiguracaoUser.css";
import Base from "../../Components/Base/Base";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Field, Form } from "formik";
import { UTCToLocal } from "../../utils/convertDate";
import { message } from "antd";

export default function ConfiguracaoAluno(props) {
  const [dataAluno, setDataAluno] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const { session } = useSession();
  const [editInputs, setEditInputs] = useState([]);
  const [open, setOpen] = useState(false);

  const configUser = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  useEffect(() => {
    api.get(`/user/${session.user.id}`, config).then((response) => {
      const birthdate = new Date(response.data.birthdate).toLocaleDateString(
        "pt-BR"
      );
      const phone = response.data.phone.replace(/[^\w\s]/gi, ""); // essa regex remove todos os caracteres especiais
      const formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(
        2,
        7
      )}-${phone.slice(7, 11)}`;

      setDataAluno({
        ...response.data,
        birthdate: birthdate,
        phone: formattedPhone,
      });
    });

    api
      .get(`/organization/${session.user.organization_id}`, config)
      .then((response) => {
        setOrganization(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da organização");
      });

    api
      .get(`/occupation/${session.user.occupation_id}`, config)
      .then((response) => {
        setOccupation(response.data);
      })
      .catch(() => {
        message.error("Não foi possível carregar dados da ocupação");
      });
  }, []);

  function handleChange(e) {
    setEditInputs({ ...editInputs, [e.target.name]: e.target.value });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditInputs({});
    setOpen(false);
  };

  function handleSubmit() {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
    let birthdate = new Date(editInputs["birthdate"]);
    birthdate = UTCToLocal(birthdate).getTime();
    const editedData = editInputs;
    editedData["birthdate"] = birthdate;
    api
      .put(`/user/${session.user.user_id}`, editedData, config)
      .then(() => alert("dados enviados com sucesso"))
      .catch((error) => {
        handleClose();
        alert("não foi possível alterar informações");
      });
  }

  return (
    <Base>
      <div className="ConfigAluno">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Edite suas Informações
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Complete os campos e clique em "Concluir Edição", para alterar os
              dados do seu perfil
            </DialogContentText>
            <TextField
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Nome"
              spellCheck="false"
              required
              onChange={handleChange}
              value={editInputs["name"]}
            />
            <TextField
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              spellCheck="false"
              required
              onChange={handleChange}
              value={editInputs["email"]}
            />

            <Formik
              validateOnMount
              initialValues={{
                city: "",
                state: "",
              }}
              render={({ isValid, setFieldValue }) => (
                <Form className="formEditProfile">
                  <Field
                    className="fieldEditProfile"
                    name="city"
                    type="text"
                    placeholder="Cidade"
                    onChange={handleChange}
                    value={editInputs["city"]}
                  />
                  <Field
                    className="fieldEditProfile"
                    component="select"
                    name="state"
                    onChange={handleChange}
                    value={editInputs["state"]}
                  >
                    <option value={null}>Selecione o Estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Field>
                </Form>
              )}
            />

            <TextField
              type="date"
              className="form-control"
              id="exampleInputAddress"
              name="birthdate"
              format="dd/mm/yyyy"
              placeholder="Data de Nascimento"
              mask="99/99/9999"
              spellCheck="false"
              value={props.value}
              onChange={props.onChange}
              required
              pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
              required
              onChange={handleChange}
              value={editInputs["birthdate"]}
            />
            <TextField
              type="text"
              className="form-control"
              id="company"
              name="company"
              placeholder="Empresa"
              spellCheck="false"
              required
              onChange={handleChange}
              value={editInputs["company"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Confirmar Edição
            </Button>
          </DialogActions>
        </Dialog>
        <div className="paginaConfigAluno">
          <div className="tituloConfigAluno">
            <p>Suas Informações:</p>
          </div>
          <div className="blocoConfigAluno">
            <div className="Listas">
              <div className="Lista1">
                <div className="linhasConfigAluno">
                  <p className="configAlunoInput">Nome:</p>
                  <p className="configAlunoOutput">{dataAluno.name}</p>
                </div>
                <div className="linhasConfigAluno">
                  <p className="configAlunoInput">Empresa:</p>
                  <p className="configAlunoOutput">{organization.name}</p>
                </div>
                <div className="linhasConfigAluno">
                  <p className="configAlunoInput">Data de Nascimento:</p>
                  <p className="configAlunoOutput">
                    {dataAluno.birthdate}
                  </p>{" "}
                </div>
                <div className="linhasConfigAluno">
                  <p className="configAlunoInput">Email:</p>
                  <p className="configAlunoOutput">{dataAluno.email}</p>
                </div>
              </div>
              <div className="Lista1">
                <div className="linhasConfigAluno">
                  <p className="configAlunoInput">Ocupação:</p>
                  <p className="configAlunoOutput">{occupation.name}</p>
                </div>
                <div className="linhasConfigAluno">
                  <p className="configAlunoInput">Telefone:</p>
                  <p className="configAlunoOutput">{dataAluno.phone}</p>
                </div>
              </div>
            </div>
            <div className="acessarConfigAluno">
              <button className="buttonConfigAluno" onClick={handleClickOpen}>
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
