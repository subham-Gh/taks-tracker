// src/components/TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onEditTask, onDeleteTask, onToggleComplete }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
