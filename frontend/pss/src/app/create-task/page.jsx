"use client";

import { useRouter } from "next/navigation";
import TaskForm from "../../components/TaskForm";
import { createTask } from "../../api/taskService";

export default function CreateTaskPage() {
  const router = useRouter();

  const handleCreateTask = async (taskData) => { 
    await createTask(taskData);
    router.push("/"); // Redirect to homepage after task creation
  };

  return (

    // Page Set Up
    <div className=" w-screen h-screen relative bg-gray-700 shadow justify-center">

      <div className="flex justify-center">
        {/* Header Div */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 w-1/2" >

          {/* Title Header */}
          <h3 className="text-lg font-semibold text-white">
            Create New Task
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


      <TaskForm onSubmit={handleCreateTask} />
    </div>

  );
}
