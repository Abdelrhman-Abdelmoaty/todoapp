import React, { useState } from "react";
import "./ToDoItem.css";

export default function ToDoItem({
  id,
  text,
  handleDelete,
  handleEdit,
  handleCheck,
  checked,
}) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [te, setTe] = useState(text);

  return (
    <div id="toDoItem">
      <p
        onClick={() => {
          if (!isBeingEdited) handleCheck(id);
        }}
        suppressContentEditableWarning={true}
        contentEditable={isBeingEdited}
        className={`${checked ? "done" : ""} ${
          isBeingEdited ? "beingEdited" : ""
        }  toDoItemText`}
        onInput={(e) => {
          setTe(e.target.textContent);
        }}
      >
        {text}
      </p>
      <div className="toDoItemBtns">
        <input
          checked={checked ?? false}
          className="checkbox"
          onChange={() => {
            handleCheck(id);
          }}
          type="checkbox"
        />
        <button
          onClick={() => {
            handleEdit(id, te);
            setIsBeingEdited((prev) => !prev);
          }}
        >
          {isBeingEdited ? "Done" : "Edit"}
        </button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
}
