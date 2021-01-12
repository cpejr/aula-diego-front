import React, { useState, useEffect } from "react";
import { useSession } from "../../Context/SessionContext";
import api from "../../services/api";
import "./ConfiguracaoAluno.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Field, Form } from "formik";
import { InputAdornment } from "@material-ui/core";

export default function ConfiguracaoAluno(props) {
  const dataAlunoHardCoded = {
    Nome: "Ana",
    Empresa: "CPE Jr",
    DataDeNascimento: "05/02/2000",
    Email: "anacampana@cpejr.com.br",
    Endereço: "Rua Padre Hermon",
    Estado: "MG",
    Sobrenome: "Campana",
    Ocupacao: "Samu",
    Sexo: "Feminino",
    Telefone: "(99) 99999-9999",
    Cidade: "Belo Horizonte",
    Cep: "99999-9999",
  };

  const [dataAluno, setDataAluno] = useState("");
  const { session } = useSession();
  const [editInputs, setEditInputs] = useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const config = {
      headers: {
        authorization: "BEARER " + session.accessToken,
      },
    };
    console.log(session.user.user_id);
    api
      .get(`/user/${session.user.user_id}`, config)
      .then((response) => {
        console.log(response.data);
        setDataAluno(response.data); //acho que os dados estão vindo em inglês, mas os nomes aqui estão em português. Conferir isso e alterar mais tarde
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  function handleChange(e) {
    setEditInputs({ ...editInputs, [e.target.name]: e.target.value });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmit(values, actions) {
    console.log("SUBMIT", values);
  }

  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, "");

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("logradouro", data.logradouro);
        setFieldValue("bairro", data.bairro);
        setFieldValue("cidade", data.localidade);
        setFieldValue("uf", data.uf);
      });
  }

  return (
    <div className="ConfigAluno">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edite suas Informações</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete os campos e clique em "Concluir Edição", para alterar os
            dados do seu perfil
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="email"
            name='email'
            placeholder="Email"
            type="email"
            fullWidth
          /> */}
          <TextField
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Nome"
            spellCheck="false"
            required
          />
          <TextField
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            spellCheck="false"
            required
          />
          <TextField
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Senha"
            spellCheck="false"
            required
          />

          <TextField
            type="password"
            className="form-control"
            id="password-confirmation"
            name="password-confirmation"
            placeholder="Confirme sua Senha"
            spellCheck="false"
            required
          />

          <Formik
            onSubmit={onSubmit}
            validateOnMount
            initialValues={{
              cep: "",
              street: "",
              number: "",
              complemento: "",
              bairro: "",
              city: "",
              state: "",
            }}
            render={({ isValid, setFieldValue }) => (
              <Form className="formEditProfile">
                <Field
                  className="fieldEditProfile"
                  name="cep"
                  type="text"
                  placeholder="CEP"
                  onBlur={(ev) => onBlurCep(ev, setFieldValue)}
                />
                <Field
                  className="fieldEditProfile"
                  name="street"
                  type="text"
                  placeholder="Logradouro"
                />
                <Field
                  className="fieldEditProfile"
                  name="number"
                  type="text"
                  placeholder="Número"
                />
                <Field
                  className="fieldEditProfile"
                  name="complemento"
                  type="text"
                  placeholder="Complemento"
                  // não tem isso no db
                />
                <Field
                  className="fieldEditProfile"
                  name="bairro"
                  type="text"
                  placeholder="Bairro"
                  // não tem isso no db
                />
                <Field
                  className="fieldEditProfile"
                  name="city"
                  type="text"
                  placeholder="Cidade"
                />
                <Field
                  className="fieldEditProfile"
                  component="select"
                  name="state"
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
            format="dd/mm/yyyy"
            placeholder="Data de Nascimento"
            mask="99/99/9999"
            spellCheck="false"
            value={props.value}
            onChange={props.onChange}
            required
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
            required
          />
          <TextField
            type="text"
            className="form-control"
            id="exampleInputTrabalho"
            placeholder="Empresa"
            spellCheck="false"
            required
          />
          <TextField
            type="text"
            className="form-control"
            id="exampleInputAddress"
            placeholder="Endereço"
            spellCheck="false"
            required
          />
          <TextField
            type="text"
            className="form-control"
            id="exampleInputSexo"
            placeholder="Sexo"
            spellCheck="false"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirmar Edição
          </Button>
        </DialogActions>
      </Dialog>
      <Sidebar />
      <div className="paginaConfigAluno">
        <Header />
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
                <p className="configAlunoOutput">{dataAluno.company}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Data de Nascimento:</p>
                <p className="configAlunoOutput">{dataAluno.birthdate}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Email:</p>
                <p className="configAlunoOutput">{dataAluno.email}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Endereço:</p>
                <p className="configAlunoOutput">{"NAO TEM NO DB"}</p>{" "}
                {/* MEXER AQUI */}
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Estado:</p>
                <p className="configAlunoOutput">{dataAluno.state}</p>
              </div>
            </div>
            <div className="Lista1">
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Sobrenome:</p>
                <p className="configAlunoOutput">{"NAO TEM NO DB"}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Ocupação:</p>
                <p className="configAlunoOutput">{dataAluno.occupation}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Sexo:</p>
                <p className="configAlunoOutput">{"NAO TEM NO DB"}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Telefone:</p>
                <p className="configAlunoOutput">{dataAluno.phone}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">Cidade:</p>
                <p className="configAlunoOutput">{dataAluno.city}</p>
              </div>
              <div className="linhasConfigAluno">
                <p className="configAlunoInput">CEP:</p>
                <p className="configAlunoOutput">{"NAO TEM NO DB"}</p>
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
  );
}
