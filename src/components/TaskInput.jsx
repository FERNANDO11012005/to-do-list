import React from "react";

const TaskInput = ({ newTask, setNewTask, addOrUpdateTask, editingIndex, cancelEdit }) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
        placeholder={editingIndex !== null ? "Edita tu tarea..." : "Nueva tarea..."}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addOrUpdateTask()}
      />
      {editingIndex !== null && (
        <button
          onClick={cancelEdit}
          className="px-3 py-2 text-gray-300 rounded-md hover:text-gray-500 transition-all duration-300"
        >
          ✖
        </button>
      )}
      <button
        className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${
          newTask.trim() === ""
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
        } text-white`}
        onClick={addOrUpdateTask}
        disabled={newTask.trim() === ""}
      >
        {editingIndex !== null ? "Editar" : "Añadir"}
      </button>
    </div>
  );
};

export default TaskInput;
