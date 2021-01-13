import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DATA = [
  {
    name: "André Versiani de Mattos",
    matricula: "000",
    curso: "Medicina",
    isAdm: 1,
  },
  {
    name: "Habib Jose da Silva",
    matricula: "001",
    curso: "Bombeiros",
    isAdm: 0,
  },
  {
    name: "Hermon Barros",
    matricula: "002",
    curso: "Enfermagem",
    isAdm: 0,
  },
  {
    name: "Pedro Gabriel",
    matricula: "003",
    curso: "Medicina",
    isAdm: 0,
  },
  {
    name: "Vitor Barros",
    matricula: "004",
    curso: "Arquitetura",
    isAdm: 0,
  },

  {
    name: "Daniel Benicá",
    matricula: "005",
    curso: "Enfermagem",
    isAdm: 0,
  },
  {
    name: "Daniel Almeida",
    matricula: "006",
    curso: "Design",
    isAdm: 1,
  },
  {
    name: "Ângela França",
    matricula: "007",
    curso: "Engenharia",
    isAdm: "0",
  },
  {
    name: "Ângela França",
    matricula: "008",
    curso: "Engenharia",
    isAdm: 0,
  },
  {
    name: "Ângela França",
    matricula: "009",
    curso: "Engenharia",
    isAdm: 0,
  },
  {
    name: "Ângela França",
    matricula: "010",
    curso: "Engenharia",
    isAdm: 0,
  },
  {
    name: "Ângela França",
    matricula: "011",
    curso: "Engenharia",
    isAdm: 0,
  },
];

const LinhaBoard = ({ nomeAluno, matricula, curso, isAdm }) => {
  const [open, setOpen] = React.useState(false);
  const [checkedB, setCheckedB] = useState(false);

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
      margin: "auto"
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  function handleSwitch() {
    setCheckedB(!checkedB);
  }

  function isAdmin() {
    return <AntSwitch checked={checkedB} onChange={handleSwitch} />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(nomeAluno, isAdm) {
    if (isAdm === 1) {
      setOpen(true);
      isAdm = 0;
    } else {
      setOpen(true);
      isAdm = 1;
          }
  }
  return (
    <div className="LinhaBoard">
      <p onClick={() => alert(nomeAluno)}>{nomeAluno}</p>
      <p onClick={() => alert(nomeAluno)}>{matricula}</p>
      <p onClick={() => alert(nomeAluno)}>{curso}</p>
      <p onChange={() => handleChange(nomeAluno, isAdm)}>{isAdmin()}</p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja fazer essa mudança?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja tirar {nomeAluno} da administração?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              handleSwitch();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Board = ({ search }) => {
  const [users, setUsers] = useState(DATA);
  const [open, setOpen] = useState(false);

  const filtered = users.filter((user) => {
    return (
      user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      user.matricula.indexOf(search) !== -1 ||
      user.curso.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });

  const Lista = filtered.map((item) => {
    return (
      <LinhaBoard
        key={item.matricula}
        nomeAluno={item.name}
        matricula={item.matricula}
        curso={item.curso}
        isAdm={item.isAdm}
      />
    );
  });

  return (
    <div>
      <div className="BoardContainer">
        <div className="LinhaBoard">
          <p style={{ borderWidth: "0px", fontSize: "25px", color: "#25003c" }}>
            Nome
          </p>
          <p style={{ borderWidth: "0px", fontSize: "25px", color: "#25003c" }}>
            Matrícula
          </p>
          <p style={{ borderWidth: "0px", fontSize: "25px", color: "#25003c" }}>
            Cursos
          </p>
          <p style={{ borderWidth: "0px", fontSize: "25px", color: "#25003c" }}>
            Admin
          </p>
        </div>
        {Lista}
      </div>
    </div>
  );
};

export default Board;
