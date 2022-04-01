import React from "react";
import axios from "axios";

import "./style.css";
import List from "../list";
import Donelist from "../done";
import Add from "../add";

export default function Api() {
  const [list, setList] = React.useState([]);
  const [todo, setTodo] = React.useState([]);
  const [done, setDone] = React.useState([]);
  const [addEvent, setAddEvent] = React.useState(false);
  const [newInput, setNewInput] = React.useState("");
  const [mode, setMode] = React.useState("light");
  const [color, setColor] = React.useState({});
  const [borderColor, setBorderColor] = React.useState({});

  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then(function (response) {
        setTodo(response.data.filter((item) => item.completed === false));
        setDone(response.data.filter((item) => item.completed === true));
      })
      .catch(function (error) {
        // handle error
        //console.log("error", error);
        alert(error);
      });
  }, []);

  //todo
  const actionTodoDone = (e) => {
    setTodo(todo.filter((item) => item.id != e.id));
    e.completed = true;
    setDone((done) => [...done, e]);
  };

  const actionDelete = (e) => {
    setTodo(todo.filter((item) => item.id != e.id));
    setDone(done.filter((item) => item.id != e.id));
  };

  //done
  const actionDoneList = (e) => {
    setDone(done.filter((item) => item.id != e.id));
    e.completed = false;
    setTodo((list) => [...list, e]);
  };

  //input handler
  const inputHandler = (e) => {
    setNewInput(e?.target?.value);
  };
  //debouncing concept for handling unneccessory rerendoring at onChange event
  //setTimeout(inputHandler, 500);

  //dark mode css
  const darkModeStyle = {
    color: "white",
    background: "#264653",
  };

  //light mode css
  const lightModeStyle = {
    color: "#000000",
    background: "#ffffff",
  };

  //display mode handler
  const displayMode = () => {
    console.log(mode);
    console.log(color);
    if (mode === "light") {
      setMode("dark");
      setColor(darkModeStyle);
      setBorderColor({ border: "1px solid white" });
    }
    if (mode === "dark") {
      setMode("light");
      setColor(lightModeStyle);
      setBorderColor({ border: "1px solid purple" });
    }
  };

  const addItemHandler = () => {
    if (newInput.length >= 3) {
      let id = 20 + Math.floor(Math.random() * 100 + 1);
      let obj = {
        completed: false,
        id: { id },
        title: `${newInput}`,
        userId: 1,
      };
      setTodo(() => [...todo, obj]);
      setAddEvent(!addEvent);
    } else {
      alert("write input length at list 3 char..");
    }
  };

  return (
    <>
      <div className="displayMode">
        <button className="modeButton" onClick={displayMode}>
          {mode}
        </button>
      </div>
      <div className="apiConatiner" style={color}>
        <div className="todoContainer" style={borderColor}>
          <div className="todoHeading">Todo</div>
          {todo.map((item) => (
            <List
              key={item.id}
              item={item}
              onSelectTodo={actionTodoDone}
              onDelete={actionDelete}
            />
          ))}
          {addEvent ? (
            <Add onChangeInput={inputHandler} onClickAddItem={addItemHandler} />
          ) : (
            <div onClick={() => setAddEvent(!addEvent)}>
              <button className="addMoreButton">+Item</button>
            </div>
          )}
        </div>
        <div className="doneContainer" style={borderColor}>
          <div className="doneHeading">Done</div>
          {done.map((item) => (
            <Donelist
              key={item.id}
              item={item}
              onSelectDone={actionDoneList}
              onDelete={actionDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}
