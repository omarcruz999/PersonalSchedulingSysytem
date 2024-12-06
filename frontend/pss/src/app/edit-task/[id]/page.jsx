"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskForm from "../../../components/TaskForm"; // Reuse the TaskForm component
import { fetchTaskById, editTask } from "../../../api/taskService"; // Import necessary functions

const EditTask = () => {
  const { id } = useParams(); // Extract the task ID from the URL
  const router = useRouter();

  const [taskData, setTaskData] = useState(""); // State to hold task data

  // Fetch the task data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await fetchTaskById(id); // Fetch the task by ID
        setTaskData(task); // Set the fetched task data
      } catch (err) {
        console.log("Failed to load task: ", err);
      } 
    };

    fetchData();
  }, [id]);

  const handleEditTask = async (updatedTaskData) => {
    try {
      await editTask(id, updatedTaskData); // Update the task with new data
      alert("Task updated successfully!"); // Show success message
      router.push("/"); // Redirect to the homepage or task list after editing
    } catch (err) {
      alert(err.message + ": Due to overlapping conflicts."); // Show error message
      router.push("/"); // Redirect to homepage after message
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-700 shadow justify-center">

      <div className="flex justify-center">
        {/* Header Div */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 w-1/2" >

          {/* Title Header */}
          <h3 className="text-lg font-semibold text-white">
            Edit Task
          </h3>

          {/* Exit Button */}
          <button type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            onClick={() => router.push("/")}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>

      {/* Pass task data */}
      <TaskForm initialValues={taskData} onSubmit={handleEditTask} /> 
    </div>
  );
};

export default EditTask;
