// CreateTodo.jsx

import { useState } from 'react';
import './CreateTodo.css';

export function CreateTodo({ refreshTodos }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => {
        fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description
            })
        }).then(async function (res) {
            if (res.ok) {
                await res.json();
                alert("Todo added");
                refreshTodos();
            } else {
                const error = await res.json();
                alert(error.msg);
            }
        });
    };

    return (
        <div className="create-todo-container">
            <input
                id="title"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                id="desc"
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleCreate}>Add Todo</button>
        </div>
    );
}
