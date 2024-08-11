const mongoose = require("mongoose");

const uri = "mongodb+srv://arnav007ooo:RuVWG9IFz35iUOdu@cluster0.dz5ptvl.mongodb.net/";

mongoose.connect(uri)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define your schema
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type:Boolean,
        default:false
    }
});



// Define the model
const todo = mongoose.model('Todo', todoSchema);

module.exports = {
    todo
};
