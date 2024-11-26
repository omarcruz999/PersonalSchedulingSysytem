"use client";

import Image from "next/image";
import Link from "next/link";
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
    // Home Page
    <div className="bg-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto p-4" style={{ overflowX: "hidden", overflowY: "scroll" }}>
        <header className="bg-white shadow rounded-lg mb-6">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu */}
              <button className="p-2 hover:bg-gray-100 rounded" data-drawer-target="filterDrawer"
                data-drawer-show="filterDrawer" aria-controls="filterDrawer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Task View Title */}
              <h1 className="text-xl font-semibold">Task View</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer"
                src="/static/images/JohnPork.jpg" alt="User dropdown" />
            </div>
          </div>
        </header>

        {/* List Of Tasks */}
        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>

      {/* Add A Task Button */}
      <div className="fixed bottom-6 right-12 rounded-full bg-gray-500 hover:bg-gray-800 hover:opacity-80 active:opacity-50">
        <Link href="/create-task">
          <button className="p-2">
            <Image 
              src="/static/images/Add Icon.svg"        
              width={70}
              height={70}
              alt="Add Task"
            />
          </button>
        </Link>      
      </div>
    </div>
  );
  
}
