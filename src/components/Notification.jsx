import React from "react";

const Notification = ({ message, onClose }) => {
if (!message) return null;

return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn">
    <span>{message}</span>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition">
        ✖
    </button>
    </div>
);
};

export default Notification;
