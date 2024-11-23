"use client";

import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../api/taskService";
import TaskList from "../components/TaskList";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    }
    loadTasks();
  }, []);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Task List</h1>
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
}
