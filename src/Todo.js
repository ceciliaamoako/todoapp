import React, { useState } from "react";
import {
  Avatar,
  Button,
  List,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import "./Todo.css";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: input }, { merge: true });
    setOpen(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={(event) => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <h1>Edit To-do</h1>
          <Input
            placeholder="Edit previous to-do"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <Button variant="contained" color="primary" onClick={updateTodo}>
            Update
          </Button>
        </div>
      </Modal>
      <List key={props.id} className="todo_list">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="deadline: ⏰" />
        </ListItem>

        <ModeEditTwoToneIcon
          onClick={(event) => setOpen(true)}
        ></ModeEditTwoToneIcon>

        <DeleteForeverRoundedIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        ></DeleteForeverRoundedIcon>
      </List>
      {/* // <li>{props.todo}</li> */}
    </>
  );
}

export default Todo;
