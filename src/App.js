// src/App.js
import React from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks, addTask, editTask, deleteTask, toggleComplete } = useTasks();

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header />
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
