import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Notification from "./components/Notification"; // Notificación agregada

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState(null);

  // Cargar tareas desde localStorage al iniciar
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

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addOrUpdateTask = () => {
    if (newTask.trim() !== "") {
      if (editingIndex !== null) {
        // Editar tarea existente
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task, i) =>
            i === editingIndex ? { ...task, text: newTask } : task
          );
          return updatedTasks;
        });

        setEditingIndex(null);
        showNotification("✅ Tarea editada correctamente.");
      } else {
        // Agregar nueva tarea
        const newTaskObj = { text: newTask, completed: false, id: Date.now() };
        setTasks((prevTasks) => [newTaskObj, ...prevTasks]);
        showNotification("🆕 Tarea añadida correctamente.");
      }
      setNewTask("");
    }
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setNewTask("");
    setEditingIndex(null);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    showNotification("🗑️ Tarea eliminada.");
  };

  const toggleComplete = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );

      // Ordenar: tareas no completadas primero, completadas después
      updatedTasks.sort((a, b) => a.completed - b.completed || b.id - a.id);

      // Notificación según estado de la tarea
      const task = updatedTasks.find((_, i) => i === index);
      showNotification(task.completed ? "✅ Tarea completada." : "⏪ Tarea restaurada.");

      return updatedTasks;
    });
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
          cancelEdit={cancelEdit} // Se pasa el botón de cancelar edición
        />
        <TaskList
          tasks={tasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
        {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      </div>
    </div>
  );
}

export default App;
