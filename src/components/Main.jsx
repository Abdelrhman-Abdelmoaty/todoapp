import React, { useEffect, useState } from "react";
import "./Main.css";
import ToDoItem from "./ToDoItem";
import defaultData from "./defaultToDoS.json";

export default function Main() {
  if (!localStorage.getItem("ToDoS")) {
    localStorage.setItem("ToDoS", JSON.stringify(defaultData));
  }
  const [ToDoS, setToDos] = useState(JSON.parse(localStorage.getItem("ToDoS")));
  const [newToDoText, setNewToDoText] = useState("");
  const ids = [-1];
  ToDoS.map((item) => ids.push(item.id));
  const handleAdd = () => {
    if (newToDoText !== "") {
      setToDos([
        ...ToDoS,
        {
          id: Math.max(...ids) + 1,
          text: newToDoText,
          checked: false,
          edited: false,
        },
      ]);
      setNewToDoText("");
    } else {
      alert("Empty!");
    }
  };
  useEffect(() => {
    localStorage.setItem("ToDoS", JSON.stringify(ToDoS));
    console.log(ToDoS);
  }, [ToDoS]);
  const handleDefault = () => {
    setToDos(defaultData);
  };
  const handleDelete = (n) => {
    setToDos(ToDoS.filter((item) => item.id !== n));
  };
  const handleCheck = (n) => {
    setToDos(
      ToDoS.map((item) => {
        if (Number(item.id) === Number(n)) {
          item.checked = !item.checked;
          return item;
        } else {
          return item;
        }
      })
    );
  };
  const handleEdit = (n, t) => {
    setToDos(
      ToDoS.map((item) => {
        if (Number(item.id) === Number(n)) {
          item.text = t;
          return item;
        } else {
          return item;
        }
      })
    );
  };
  return (
    <div id="main">
      <div className="head">TO-DO App</div>
      <div className="container">
        {ToDoS.map((item) => {
          return (
            <ToDoItem
              key={item.id}
              id={item.id}
              text={item.text}
              handleDelete={handleDelete}
              handleCheck={handleCheck}
              handleEdit={handleEdit}
              checked={item.checked}
            />
          );
        })}
      </div>
      <div>
        <div className="bottom">
          <input
            className="newToDoField"
            type="text"
            value={newToDoText}
            onChange={(e) => {
              setNewToDoText(e.target.value);
            }}
          />
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleDefault}>Default</button>
        </div>
      </div>
    </div>
  );
}
