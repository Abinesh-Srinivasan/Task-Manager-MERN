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

// Creating the task in the Db
app.post("/task", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await taskModel({ title, description });
    newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

// Obtaining all the tasks from the Db
app.get("/task", async (req, res) => {
  try {
    const allTasks = await taskModel.find();
    res.status(200).send(allTasks);
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
