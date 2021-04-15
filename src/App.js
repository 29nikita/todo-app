import "./styles.css";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { db } from "./firebase_config.js";
import TodoListItem from "./Todo.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setToDoInput] = useState("");

  useEffect(() => {
    getTodo();
  }, []); //blank to run only on first launch

  function getTodo() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
        }))
      );
    });
  }

  function handleTodoClick(e) {
    e.preventDefault();

    const x = document.forms["formTodo"]["todo"].value;
    if (x === "") {
      alert("You need to enter some value");
      return false;
    } else {
      db.collection("todos").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
    }

    setToDoInput("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 className="heading">TODO App</h1>
        <form name="formTodo">
          <input
            name="todo"
            type="text"
            value={todoInput}
            onChange={(e) => {
              setToDoInput(e.target.value);
            }}
            className="inputText"
            placeholder="Write a todo"
          />
          <button className="btnAdd" onClick={handleTodoClick}>
            Add
          </button>
        </form>
        {todos.map((todo) => (
          <TodoListItem todo={todo.todo} id={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
