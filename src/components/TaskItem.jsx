import React from "react";

const TaskItem = ({ task, index, editTask, deleteTask, toggleComplete }) => {
  if (!task) return null;

  return (
    <li
      className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 ${
        task.completed ? "bg-green-700 text-gray-300" : "bg-gray-700 text-white"
      }`}
    >
      <span
        className={`flex-1 text-lg transition-all duration-300 ${
          task.completed
            ? "line-through text-gray-400 cursor-not-allowed"
            : "cursor-pointer hover:underline"
        }`}
        onClick={() => !task.completed && editTask(index)}
      >
        {task.text}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => toggleComplete(index)}
          className={`px-3 py-1 rounded-lg transition-all duration-300 ${
            task.completed
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          ✅
        </button>
        <button
          onClick={() => deleteTask(index)}
          className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
