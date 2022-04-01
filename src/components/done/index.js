import React from "react";

import "./style.css";

export default function (props) {
  return (
    <div className="doneMainContainer">
      <div className="doneItemNameContainer">{props.item.title}</div>
      <div className="doneButtonsContaine">
        <button
          className="todoButton"
          onClick={() => props.onSelectDone(props.item)}
        >
          todo
        </button>
        <button
          className="doneDeleteButton"
          onClick={() => props.onDelete(props.item)}
        >
          {" "}
          delete
        </button>
      </div>
    </div>
  );
}
