import { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const apiURL = "http://localhost:5000";

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

  console.log(tasks);

  const handleSubmit = () => {
    setTitle("");
    setDescription("");
  };
  return (
    <div className=" flex flex-col items-center tracking-wide">
      <h1 className=" font-bold text-4xl mt-5">Task Manager</h1>

      {/* Input Section */}
      <div className="INPUTS mt-4 flex gap-16 items-end">
        <div className="TITLE flex flex-col gap-2">
          <h2 className=" font-semibold tracking-wide">Title:</h2>
          <input
            type="text"
            className=" border border-blue-500 px-3 py-1 w-96 outline-none rounded-sm tracking-wider"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="DESCRIPTION flex flex-col gap-2">
          <h2 className=" font-semibold tracking-wide">Description:</h2>
          <input
            type="text"
            className=" border border-blue-500 px-3 py-1 w-96 outline-none rounded-sm tracking-wider"
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
        <ul className=" bg-blue-50 mt-5 border rounded-xl p-5">
          {
            tasks.map((task) => (
              <li key={task._id} className=" flex p-3 gap-56 items-center justify-between -mt-2 ">
                <h1 className=" text-xl font-semibold">{task.title}</h1>
                <h1 className=" text-lg w-96">{task.description}</h1>
                <button className=" bg-red-500 text-white p-1 px-3 rounded-lg">Delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default App;
