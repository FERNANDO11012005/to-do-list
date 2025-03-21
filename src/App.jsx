import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput"; // Importación correcta
import TaskList from "./components/TaskList";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Estado para saber si estamos editando

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("❌ Error al cargar tareas:", error);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (newTask.trim() !== "") {
      if (editingIndex !== null) {
        // 🛠 Editar tarea existente
        const updatedTasks = tasks.map((task, i) =>
          i === editingIndex ? { ...task, text: newTask } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null); // Resetear estado de edición
      } else {
        // ➕ Agregar nueva tarea
        setTasks([...tasks, { text: newTask, completed: false }]);
      }
      setNewTask("");
    }
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text); // Cargar texto de la tarea en el input
    setEditingIndex(index); // Guardar índice de la tarea que estamos editando
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-blue-900">
      <div className="p-6 max-w-lg w-full bg-gray-800 shadow-2xl rounded-lg text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-400">
          ✅ TO DO LIST
        </h1>
        <TaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          addOrUpdateTask={addOrUpdateTask}
          editingIndex={editingIndex}
        />
        <TaskList
          tasks={tasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
