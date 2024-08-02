import { useEffect, useState } from "react";

const App = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const apiURL = import.meta.env.VITE_RenderApiUrl;

  // Get the tasks from the Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL + "/task");
        if (!response.ok) console.log("API data not fetched");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      alert(
        "There may be some delay occurs when adding and retrieving the tasks due to API calls..."
      );
    }
  },[])

  // Send the task to the Backend
  const handleSubmit = async () => {
    try {
      const response = await fetch(apiURL + "/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) =>[...prevTasks, newTask]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setTitle("");
    setDescription("");
  };

  // Delete the task
  const handleDelete = async (id) => {
    const response = await fetch(apiURL + "/task/" + id, {
      method:"DELETE"
    })
    if (response.ok) {
      setTasks((prevTasks)=>prevTasks.filter((task)=>task._id!==id))
    }
  }

  // User Interface
  return (
    <div className=" flex flex-col items-center tracking-wide mb-10">
      <h1 className=" font-bold text-4xl mt-5">Task Manager</h1>

      {/* Input Section */}
      <div className="INPUTS mt-4 lg:flex gap-16 items-end">
        <div className="TITLE flex flex-col gap-2">
          <h2 className=" font-semibold tracking-wide">Title:</h2>
          <input
            type="text"
            className=" border border-blue-500 px-3 py-1 lg:w-96 outline-none rounded-sm tracking-wider"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="DESCRIPTION flex flex-col gap-2">
          <h2 className=" font-semibold tracking-wide">Description:</h2>
          <input
            type="text"
            className=" border border-blue-500 px-3 py-1 lg:w-96 outline-none rounded-sm tracking-wider"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <button
          className=" block w-24 py-1.5 text-white font-bold bg-green-400 mt-3 rounded-lg"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>

      {/* Tasks Section */}
      <div className=" mt-5 flex flex-col items-center">
        <h1 className=" font-semibold text-2xl">Your Tasks</h1>
        <ul className=" bg-blue-0 mt-5 rounded-xl lg:p-5">
          {tasks.map((task) => (
            <li
              key={task._id}
              className=" flex p-3 gap-12 lg:gap-56 items-center lg:justify-between lg:-mt-2 "
            >
              <div>
                <h1 className=" text-xl w-40 lg:w-96 font-semibold">{task.title}</h1>
                <h1 className=" text-lg w-52 lg:w-96">{task.description}</h1>
              </div>
              <button className=" bg-red-500 text-white p-1 px-3 rounded-lg"
              onClick={()=>handleDelete(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
