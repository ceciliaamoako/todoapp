import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); // clear up the input after adding todo
  };

  //when the app loads we want to listen to the
  // database and fetch new todos as the get added/removed

  // useEffects(function, dependencies)
  // this code fires when the app loads
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>

      <form>
        <FormControl>
          <InputLabel> ✅ Add a To-do</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="success"
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
