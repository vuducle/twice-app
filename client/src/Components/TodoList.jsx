import React, { useState, useEffect } from 'react';

function TodoList({ }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();

        const interval = setInterval(fetchTodos, 3000);

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

    const handleStatusChange = async (id, completed) => {
        try {
            const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...todos.find(todo => todo.id === id), completed }) 
            });
            
            if (!response.ok) {
                throw new Error("Failed to update status");
            }
            
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }
                return todo;
            });

            setTodos(updatedTodos);
        } catch (error) {
            console.error("Error updating status:", error);
        }

    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
                method: "DELETE"
            });
        
            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }
        
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    return (
        <>
        <ul>
            {todos.map((todo) => (
            <li className="font-vietnam" key={todo.id}>
                <input
                type="checkbox"
                className='mr-2'
                checked={todo.completed}
                onChange={(e) => handleStatusChange(todo.id, e.target.checked)}
                />
                <span>{todo.title}</span>
                <button className="bg-rose-500 hover:bg-rose-700 cursor-pointer py-2 px-1.5 rounded-md ml-2" onClick={() => deleteTodo(todo.id)}>🗑️</button>
            </li>
            ))}
        </ul>
        </>
    );
}

export default TodoList;
