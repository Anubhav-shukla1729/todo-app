import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const res = await fetch("http://localhost:3000/todos");
            const json = await res.json();
            setTodos(json.todos);
        } catch (error) {
            console.error("Failed to fetch todos", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const refreshTodos = () => {
        fetchTodos();
    };

    return (
        <>
            <CreateTodo refreshTodos={refreshTodos} />
            <Todos todos={todos} refreshTodos={refreshTodos} />
        </>
    );
}

export default App;
