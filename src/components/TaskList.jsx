import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, editTask, deleteTask, toggleComplete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4" aria-live="polite">
        No hay tareas pendientes.
      </p>
    );
  }

  const allCompleted = tasks.every(task => task.completed);

  return (
    <div className="mt-4">
      {allCompleted && (
        <p className="text-center text-green-400 font-semibold transition-opacity duration-500">
            Todas las tareas están completadas 
        </p>
      )}

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
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

