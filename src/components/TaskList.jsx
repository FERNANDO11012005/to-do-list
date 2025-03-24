import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, editTask, deleteTask, toggleComplete }) => {
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-400 mt-4" role="alert">
        No hay tareas pendientes.
      </p>
    );
  }

  // Ordenar tareas: No completadas arriba, completadas abajo
  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed || b.id - a.id);

  return (
    <div className="mt-4">
      {tasks.every(task => task.completed) && (
        <p className="text-center text-green-400 font-semibold transition-opacity duration-500">
          🎉 Todas las tareas están completadas.
        </p>
      )}

      <ul className="space-y-2">
        {sortedTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
