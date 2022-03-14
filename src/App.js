import React, { useState, useEffect } from "react";
import './App.css';

import Form from "./components/form";
import TodoList from "./components/TodoList";
function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all")
  const [filteredTodos, setfilteredTodos] = useState([])
  //run once when the app start
  useEffect(() => {
    getLocalTodos();
  },[]);
  //fuctions
  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setfilteredTodos(todos.filter((todo) => todo.completed === true))
          break;
        case 'uncompleted':
          setfilteredTodos(todos.filter((todo) => todo.completed === false))
          break;
        default:
          setfilteredTodos(todos);
          break;
      }
    }
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos))
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos", JSON.stringify(todos)))
      setTodos(todoLocal);
    }
  };


  return (
    <div className="App">
      <header>
        <h1>Dinesh's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
