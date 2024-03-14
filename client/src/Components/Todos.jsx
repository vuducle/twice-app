import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/todos'); 
      if (!response.ok) {
        throw new Error('Failed fetching todos');
      }
      const data = await response.json();
      setTodos(data); 
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <div>
      <h1 className='font-vietnam text-2xl md:text-4xl font-bold'>TWICE-APP</h1>
      <ul>
        {todos.map(todo => (
          <li className="font-vietnam" key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
