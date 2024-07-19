const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connecting to the DataBase
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

// Creating Schema
const taskSchema = {
  title: {
    type: String,
    required: true,
  },
  description: String,
};

// Creating Model for Schema
const taskModel = mongoose.model("Task", taskSchema);

// Middleware to parse JSON data
app.use(express.json());

// Creating new item in the Db
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new taskModel({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Get all items from Db
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await taskModel.find();
    res.status(200).json(allTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Server connection
app.listen(5000, () => console.log("Server connected to the port 5000."));
