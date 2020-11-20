import React from "react";
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
import "./EditProfile.css";

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);

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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Email"
            type="email"
            fullWidth
          />
          <TextField
            type="text"
            className="form-control"
            id="exampleInputName"
            placeholder="Nome"
            spellCheck="false"
            required
          />
          <TextField
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Email"
            spellCheck="false"
            required
          />
          <TextField
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Senha"
            spellCheck="false"
            required
          />

          <TextField
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirme sua Senha"
            spellCheck="false"
            required
          />

          <Formik
            onSubmit={onSubmit}
            validateOnMount
            initialValues={{
              cep: "",
              logradouro: "",
              numero: "",
              complemento: "",
              bairro: "",
              cidade: "",
              uf: "",
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
                  name="logradouro"
                  type="text"
                  placeholder="Logradouro"
                />
                <Field
                  className="fieldEditProfile"
                  name="numero"
                  type="text"
                  placeholder="Número"
                />
                <Field
                  className="fieldEditProfile"
                  name="complemento"
                  type="text"
                  placeholder="Complemento"
                />
                <Field
                  className="fieldEditProfile"
                  name="bairro"
                  type="text"
                  placeholder="Bairro"
                />
                <Field
                  className="fieldEditProfile"
                  name="cidade"
                  type="text"
                  placeholder="Cidade"
                />
                <Field
                  className="fieldEditProfile"
                  component="select"
                  name="uf"
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
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
