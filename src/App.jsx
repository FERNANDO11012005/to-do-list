import { useState } from "react";


function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-blue-900">
      <div className="p-6 max-w-lg w-full bg-gray-800 shadow-2xl rounded-lg text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-400">
          ✅ TO DO LIST
        </h1>

        {/* Input y Botón */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            placeholder="Nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold transition-all"
            onClick={addTask}
          >
            +
          </button>
        </div>

        {/* Lista de Tareas */}
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 border rounded-md cursor-pointer transition-all shadow-lg ${
                task.completed
                  ? "bg-gray-700 text-red-500 line-through"
                  : "bg-gray-900 text-white"
              }`}
              onClick={() => toggleTask(index)}
            >
              <span className="font-medium">{task.text}</span>
              <button
                className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
