"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, uploadSchedule } from "../api/taskService";
import TaskList from "../components/TaskList";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [dates, setDates] = useState([]);

  // State for task display
  const [taskState, setTaskState] = useState("");

  // State for hamburger menu visibility
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // State for Read Input field visibility 
  const [showReadFileInput, setShowReadFileInput] = useState(false);

  // Visibility of File Name input
  const [showFileNameInput, setShowFileNameInput] = useState(false);

  // Visibility of Time Period input
  const [showTimePeriodInput, setShowTimePeriodInput] = useState(false);

  // Visibility of Start Date input
  const [showStartDateInput, setShowStartDateInput] = useState(false);

  // Start date input
  const [startDate, setStartDate] = useState("");

  // Time period (day, week, or month)
  const [timePeriod, setTimePeriod] = useState("day");

  // Manages the file name and visibility of the download button 
  const [fileName, setFileName] = useState("");

  // Fetch tasks from API
  useEffect(() => {
    async function loadTasks() {
      const fetchedTasks = await fetchTasks();
      const fetchedDates = fetchedTasks.map(task => task.date_time)
      setTasks(fetchedTasks);      
      setDates(fetchedDates)
    }
    loadTasks();
  }, []);

  // Function to sort tasks by date/week/month
  const sortTasks = () => {
    // Create an indexed array from the tasks array
    const taskDates = [...tasks]  // Use the spread operator to create a new array
      .map((task, index) => ({ date: task.date_time, index})) // Map tasks to objects with date and index
      .sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1) // Sort by date
      .map(item => item.index); // Get the indices after sorting

    // Use the sorted indices to map back to the tasks
    const sortedTasks = taskDates.map(index => tasks[index]);

    return sortedTasks;
  }

  // Function to delete a task
  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    setDates(dates.filter((_, index) => index !== taskIndex));
  };

  // Toggles the state of the hamburger menu's visibility
  const openFilterDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const closeFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  // Toggles the state of Read Input field visibility 
  const toggleReadFileInput = () => {
    setShowReadFileInput((prev) => !prev);
  };

  // Toggle the visibility of the time period and start date inputs
  const toggleWriteToFileInputs = () => {
    setShowFileNameInput((prevState) => !prevState);
    setShowTimePeriodInput((prevState) => !prevState); // Toggle time period visibility
    setShowStartDateInput((prevState) => !prevState);   // Toggle start date visibility
  };

  // Handle start date change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Handle time period change (Day, Week, Month)
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  // Handle Reading from File
  const handleFileInput = async (e) => {
    const file = e.target.files[0]; // Access the file from the input element

    // File is being uploaded
    try {
      const result = await uploadSchedule(file); // Pass the selected file to the uploadSchedule function

      // Check if the reponse contains a tasks property and it is an array
      if (result.tasks && Array.isArray(result.tasks)) {
        updateTasks(result.tasks);  // Calls the updateTasks function to update the tasks state

        // Display a success message
        alert(result.message || "Schedule uploaded successfully!");
      } else {
        // Display an error message if the tasks data is invalid
        console.error("Invalid tasks data in response:", result);
      }
    } catch (error) {
      // Display an error message if the file upload fails
      console.error("File upload failed: ", error);
      alert("File upload failed. Please try again.");
    }
  };

  // Update tasks after reading from file
  const updateTasks = (newTasks) => {
    // Update the tasks state with the new tasks
    setTasks((prevTasks) => {
      // Check if the newTasks exists and is an array
      if (!newTasks || !Array.isArray(newTasks)) {
        // Display an error message if the newTasks is invalid and returns the previous tasks unchanged
        console.error("Invalid newTasks format:", newTasks);
        return prevTasks;
      }
      
      // Return the previous tasks and the new tasks using the spread operator
      return [...prevTasks, ...newTasks];
    });
  };

  // Formats the duration of the tasks for json file 
  const formatDuration = (duration) => {
    let result = 0.0;
    let calc = duration / 15;

    // Add .25 to result for every 15 minutes 
    for (let i = 1; i <= calc; i++) {
      result += .25;
    }

    // Return result with two decimal places
    return result.toFixed(2);
  };

  // Formats the start time of the tasks for json file 
  const formatStartTime = (startTime) => {
    // Split the original startTime 
    let originalTime = startTime.split(':');

    // Call formatDuration to format the minutes and split it so '0.' is not included
    let newTime = formatDuration(originalTime[1]).split('.');

    // Return the original hours with the new minutes
    return originalTime[0] + "." + newTime[1];

  }

  // Adds task information to the string holding the contents of the JSON file
  const appendTaskInfo = (tasks) => {
    // Holds task information for json file download
    let data = "[\n";

    // For each task append its information to data
    tasks.forEach(task => {

      if (task.task_type === "recurring") {
        data +=
          `  {
    "Name" : "${task.title}",
    "Type" : "${task.task_type}",
    "Start Date" : ${(task.start_date).replaceAll('-', '')},
    "StartTime" : ${formatStartTime(task.start_time)},
    "Duration" : ${formatDuration(task.duration)},
    "End Date" : ${(task.end_date).replaceAll('-', '')},
    "Frequency" : ${task.frequency == "daily" ? 1 : 7}
  },\n`

      } else if (task.task_type == "transient"){

        data +=
          `  {
    "Name" : "${task.title}",
    "Type" : "${task.task_type}",
    "Date" : ${(task.start_date).replaceAll('-', '')},
    "StartTime" : ${formatStartTime(task.start_time)},
    "Duration" : ${formatDuration(task.duration)}
  },\n`
      }
    });

    data = data.slice(0, -2); // remove comma after last task is added to data
    
    // If data is empty, do not add the last bracket 
    if(!data === "")
      data += "\n]"

    // Return string filled with task information
    return data;
  }

  async function writeScheduleToFile() {

    // If there are no tasks, alert the user and abort
    if (tasks.length <= 0) {
      alert("Failed to write to file. \nAt least one task must be created to write to a file.")
      return;
    } else {

      // Array of sorted tasks
      const tasks = sortTasks();

      // Date that user selects to mark as beginning of file time period 
      const selectedDate = dayjs(startDate);

      // Array that contains the tasks that fall in the selected time period 
      let filteredTasks = [];

      // Filter tasks based on the time period the user selects - only include tasks within time period
      switch (timePeriod) {

        case "day":
          const endDate = dayjs(selectedDate);
          filteredTasks = tasks.filter(task => dayjs(task.start_date).isSame(selectedDate, 'day'));
          break;

        case "week":
          const startOfWeek = selectedDate.startOf('week');
          const endOfWeek = selectedDate.endOf('week');
          filteredTasks = tasks.filter(task => dayjs(task.start_date).isBetween(startOfWeek, endOfWeek, null, []));
          break;

        case "month":
          const startOfMonth = selectedDate.startOf('month');
          const endOfMonth = selectedDate.endOf('month');
          filteredTasks = tasks.filter(task => dayjs(task.start_date).isSame(selectedDate, 'month'));
          break;

      }

      // Adds all task information into data string to be written to json 
      let data = appendTaskInfo(filteredTasks);

      // Create blob 
      const blob = new Blob([data], { type: 'text/plain' });

      // Create URL pointing to the data
      const url = window.URL.createObjectURL(blob);

      // Create download link and trigger it 
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.json`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
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
                aria-label="Open filter drawer"
              >
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
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/static/images/JohnPork.jpg"
                alt="User dropdown"
              />
            </div>
          </div>
        </header>

        {/* List Of Tasks */}
        <TaskList 
          tasks={sortTasks()} 
          mode={taskState}
          onDelete={handleDelete} 
        />

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
                  onClick={() => setTaskState("daily")}
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Daily</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="filterViewWeeklyButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                  onClick={() => setTaskState("weekly")}
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Weekly</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="filterViewMonthlyButton"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                  onClick={() => setTaskState("monthly")}
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
                  onClick={toggleWriteToFileInputs}
                >
                  <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Write Schedule To File</p>
                </button>

                {/* Write to File Button */}
                {showFileNameInput && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_name_input">
                      Enter File Name
                    </label>

                    {/* File Chooser */}
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      id="file_name_input"
                      placeholder="Enter File Name"
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />

                    {showTimePeriodInput && (
                      <div>
                        <label htmlFor="time_period" className="block mb-2 text-sm font-medium text-gray-900">
                          Select Time Period
                        </label>
                        <select
                          id="time_period"
                          value={timePeriod}
                          onChange={handleTimePeriodChange}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        >
                          <option value="day">Day</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </select>
                      </div>
                    )}

                    {showStartDateInput && (
                      <div>
                        <label htmlFor="start_date" className="block mb-2 text-sm font-medium text-gray-900">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="start_date"
                          value={startDate}
                          onChange={handleStartDateChange}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    )}

                    {/* Show download button once file name is entered */}
                    {fileName && (
                      <button
                        onClick={writeScheduleToFile}
                        className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Download File
                      </button>
                    )}
                  </div>
                )}
              </li>

              {/* Read Schedule From File */}
              <button
                type="button"
                id="readFromFileButton"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group focus:bg-gray-300"
                onClick={toggleReadFileInput}
              >
                <p className="flex-1 ms-3 rtl:text-right whitespace-nowrap text-xl">Read From File</p>
              </button>

              {showReadFileInput && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input_read">
                    Upload File
                  </label>
                  {/* File Chooser */}
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    id="file_input_read"
                    type="file"
                    onChange={handleFileInput}
                  />
                </div>
              )}
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
