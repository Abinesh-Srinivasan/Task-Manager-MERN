const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Database Connection
const connectionString = "mongodb://localhost:27017/";
async function mongoDbConnect() {
  await mongoose.connect(connectionString);
  console.log("Database connected");
}
mongoDbConnect().catch((err) => console.log(`Db Connection error:${err}`));

// Creating MongoDb Schema
const taskSchema = {
  title: {
    type: String,
    required: true,
  },
  description: String,
};

// Creating Model for Schema
const taskModel = new mongoose.model("Task", taskSchema);

// Middleware to Parse JSON Data
app.use(express.json());

// Create the task in the Db
app.post("/task", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new taskModel({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

// Obtain all the tasks from the Db
app.get("/task", async (req, res) => {
  try {
    const allTasks = await taskModel.find();
    res.status(200).send(allTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

// Update the task in the Db
app.put("/task/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updatedTask) res.status(404).send("Given Task not found");
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

// Delete the task in the Db
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

// Server connection
const portNumber = 5000;
app.listen(portNumber, () =>
  console.log(`Server connected to the port ${portNumber}...`)
);
