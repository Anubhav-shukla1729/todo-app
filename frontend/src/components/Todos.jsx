// Todos.jsx

import './Todos.css';

export function Todos({ todos, refreshTodos }) {
    const handleComplete = async (id) => {
        try {
            await fetch(`http://localhost:3000/completed/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("Todo marked as completed");
            refreshTodos();
        } catch (error) {
            console.error("Failed to mark todo as completed", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/todo/${id}`, {
                method: "DELETE",
            });
            alert("Todo deleted");
            refreshTodos();
        } catch (error) {
            console.error("Failed to delete todo", error);
        }
    };

    return (
        <div className="todos-container">
            {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <button
                        className={todo.completed ? 'completed' : 'mark-completed'}
                        onClick={() => handleComplete(todo._id)}
                    >
                        {todo.completed ? 'Completed' : 'Mark as completed'}
                    </button>
                    <button className="delete" onClick={() => handleDelete(todo._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
