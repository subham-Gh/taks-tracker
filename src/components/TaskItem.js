// src/components/TaskItem.js
import React, { useState } from "react";
import TaskForm from "./TaskForm";

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      className={`p-4 bg-white rounded-lg shadow-md ${
        task.completed ? "bg-gray-200 opacity-75" : ""
      }`}
    >
      {isEditing ? (
        <TaskForm
          onAddTask={(updated) => {
            onEdit(task.id, updated);
            setIsEditing(false);
          }}
          existingTask={task}
        />
      ) : (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">
              Deadline: {task.deadline || "None"}
            </p>
            <p className="text-sm text-gray-600">
              Tags: {task.tags?.join(", ") || "None"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
