import React, { useState } from 'react'

function TodoForm( {addTodo} ) {
    const [todo, setTodo] = useState("");

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

   const handleSubmit = async (e) => {
        e.preventDefault();
        if (!todo.trim()) return;

        try {
            const response = await fetch('http://localhost:8080/api/todos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: todo })
            });

            if (!response.ok) throw new Error("Failed to POST Todo");

            const data = await response.json();
            console.log(data);
            addTodo(data);
            setTodo('');
        } catch (err) {
            console.error('Error:', err);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={todo}
                onChange={handleChange}
                placeholder="Enter a new todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoForm;