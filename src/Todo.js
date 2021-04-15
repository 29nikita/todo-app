import React from "react";
import { db } from "./firebase_config.js";

export default function TodoListItem({ todo, id }) {
  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <div>
      <p style={{ display: "inline-block", color: "#374151" }}>{todo}</p>
      <button
        style={{
          display: "inline-block",
          marginLeft: "2rem",
          border: "none",
          padding: 0,
          background: "none",
          cursor: "pointer",
        }}
        onClick={deleteTodo}
      >
        x
      </button>
    </div>
  );
}
