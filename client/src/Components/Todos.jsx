import React, { useState, useEffect } from "react";
import TodoForm from "./Todoform";
import TodoList from "./TodoList";
function Todos() {
  const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

  return (
    <section id="todos" className="container mx-auto flex items-center content-center">
      <div>
        <h1 className="font-vietnam text-2xl md:text-4xl font-bold">
          TWICE-APP
        </h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todosParameter={todos} />
      </div>
    </section>
  );
}

export default Todos;
