// index.js

const express = require('express');
const cors = require('cors');
const app = express();
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');

app.use(express.json());
app.use(cors());

// Create a new todo
app.post('/todo', async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({ msg: "You sent the wrong inputs" });
        return;
    }

    const newTodo = await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false // Set default value for completed
    });

    res.json({
        msg: "Todo created",
        newTodo
    });
});

// Fetch all todos
app.get('/todos', async function (req, res) {
    const todos = await todo.find({});
    res.json({ todos });
});

// Mark a todo as completed
app.put("/completed/:id", async function (req, res) {
    const { id } = req.params;
    const parsedPayload = updateTodo.safeParse({ id });

    if (!parsedPayload.success) {
        res.status(411).json({ msg: "You sent the wrong inputs" });
        return;
    }

    const updatedTodo = await todo.findByIdAndUpdate(id, { completed: true }, { new: true });

    if (updatedTodo) {
        res.json({
            msg: "Todo marked as completed",
            updatedTodo
        });
    } else {
        res.status(404).json({
            msg: "Todo not found"
        });
    }
});

// Delete a todo
app.delete("/todo/:id", async function (req, res) {
    const { id } = req.params;

    const deletedTodo = await todo.findByIdAndDelete(id);

    if (deletedTodo) {
        res.json({
            msg: "Todo deleted",
            deletedTodo
        });
    } else {
        res.status(404).json({
            msg: "Todo not found"
        });
    }
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});
