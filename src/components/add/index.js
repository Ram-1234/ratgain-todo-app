import React from "react";

import "./style.css";

export default function (props) {
  return (
    <div className="addInputItemConatainer">
      <input
        className="addInputField"
        type="text"
        placeholder="next todo"
        onChange={(e) => props.onChangeInput(e)}
      />
      <button className="addInputButton" onClick={() => props.onClickAddItem()}>
        add
      </button>
    </div>
  );
}
