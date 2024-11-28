"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../api/taskService";
import TaskList from "../components/TaskList";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false); // State for hamburger menu visibility

  // useEffect is used to fetch tasks from the backend whe nthe component is first rendered
  useEffect(() => {
    // loadtask function calls the fetchTasks function and sets the tasks state to the fetched tasks
    async function loadTasks() {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    }
    loadTasks();
  }, []);

  // Function to delete a task with the given taskId
  const handleDelete = async (taskId) => {
    // Calls the deleteTask function and sets the tasks state to the tasks array without the deleted task
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Toggles the state of the hamburger menu's visibility
  const openFilterDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const closeFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
  };


  return (
    // Home Page
    <div className="bg-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto p-4" style={{ overflowX: "hidden", overflowY: "scroll" }}>

        
        
        {/* Home Page Conents */}
        <header className="bg-white shadow rounded-lg mb-6">
          <div className="flex justify-between items-center p-4">

            {/* Holds appbar contents */}
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu */}

              <button
                onClick={openFilterDrawer}
                className="p-2 hover:bg-gray-100 rounded"
                aria-controls="filterDrawer"
                aria-expanded={isFilterDrawerOpen}
                aria-label="Open filter drawer">

                {/* Hamburger Menu Image */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

              </button>

              {/* Task View Title */}
              <h1 className="text-xl font-semibold">Task View</h1>

            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-4">
              {/* User Avatar Image */}
              <img
                id="avatarButton"
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/static/images/JohnPork.jpg"
                alt="User dropdown" />

            </div>
          </div>
        </header>



        {/* List Of Tasks */}
        <TaskList tasks={tasks} onDelete={handleDelete} />

      </div>



      {/* Add A Task Button */}
      <div className="fixed bottom-6 right-12 rounded-full bg-gray-500 hover:bg-gray-800 hover:opacity-80 active:opacity-50">
        {/* Takes User To Create Task Page */}
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



      {/* Hamburger Menu Modal */}
      {isFilterDrawerOpen && (
        <div
          id="filterDrawer"
          className="fixed top-0 left-0 z-40 h-screen p-4 bg-white w-64 shadow-lg transition-transform"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filterDrawerLabel"
        >
          <h4 id="filterDrawerLabel" className="text-2xl font-bold text-center underline mb-4">
            Filter View
          </h4>
          <button
            onClick={closeFilterDrawer}
            aria-controls="filterDrawer"
            aria-label="Close filter drawer"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-4 right-4 flex items-center justify-center"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          {/* Filter View Selections */}
          <div className="py-4 overflow-y-auto" role="group">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  type="button"
                  id="filterViewDailyButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Daily</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="filterViewWeeklyButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Weekly</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="filterViewMonthlyButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Monthly</p>
                </button>
              </li>
            </ul>
          </div>

          <div style={{ height: "2em" }}></div>

          {/* File Operations */}
          <h4 className="text-2xl font-bold text-center underline mb-4">File Operations</h4>
          <div className="py-4 overflow-y-auto" role="group">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  type="button"
                  id="writeScheduleToFileButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Write Schedule To File</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="readFromScheduleButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Read From Schedule</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}



      {/* Overlay to close the modal when clicking outside */}
      {isFilterDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25"
          onClick={closeFilterDrawer}
          aria-hidden="true"
        ></div>
      )}
    </div>
    
  );
}
