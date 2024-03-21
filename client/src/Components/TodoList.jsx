import React, { useState, useEffect } from 'react'

function TodoList( {todosParameter} ) {
    const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();

    const interval = setInterval(fetchTodos, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/todos");
      if (!response.ok) {
        throw new Error("Failed fetching todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <>
        <ul>
          {todos.map((todo) => (
            <li className="font-vietnam" key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
    </>
  )
}

export default TodoList