import React from "react";

import "./style.css";

export default function (props) {
  return (
    <div className="listMainContainer">
      <div className="listItemNameContainer"> {props.item.title}</div>
      <div className="listButtonsContainer">
        <button
          className="doneButton"
          onClick={() => props.onSelectTodo(props.item)}
        >
          done
        </button>
        <button
          className="listDeleteButton"
          onClick={() => props.onDelete(props.item)}
        >
          {" "}
          delete
        </button>
      </div>
    </div>
  );
}
