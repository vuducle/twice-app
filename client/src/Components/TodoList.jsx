import React, { useState, useEffect } from 'react';

function TodoList({ todosParameter }) {
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

    return (
        <>
        <ul>
            {todos.map((todo) => (
            <li className="font-vietnam" key={todo.id}>
                <span>{todo.title}</span>
                <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => handleStatusChange(todo.id, e.target.checked)}
                />
            </li>
            ))}
        </ul>
        </>
    );
}

export default TodoList;
