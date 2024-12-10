"use client";

import { useRouter } from "next/navigation";
import TaskForm from "../../components/TaskForm";
import { createTask, deleteTask } from "../../api/taskService";
import dayjs from "dayjs";

export default function CreateTaskPage() {
  const router = useRouter();

  const handleCreateTask = async (taskData) => {

    if (taskData.type === "recurring" || taskData.type === "transient"){

      // Create a clone of the taskData to modify the start_date for recurring tasks
      let modified_data = { ...taskData };
      let start_date = dayjs(modified_data.start_date);
      let end_date = dayjs(modified_data.end_date);

      // Makes the loop run once if transient
      if (taskData.type === "transient")
        end_date = start_date

      // Count incrementer for the frequency
      const frequency = modified_data.frequency === "daily" ? 1 : 7;
      
      try{

        // Checks to see if the start_date is <= the end_date
        while (start_date.isBefore(end_date) || start_date.isSame(end_date)){
          
          // Update the modifed_data object with new start_date
          modified_data.start_date = start_date.format("YYYY-MM-DD")
          await createTask(modified_data)
          start_date = start_date.add(frequency, "day")

        }
        alert("Task(s) created successfully!"); // Show success message
        router.push("/"); // Redirect to homepage after task creation
      } catch (error) {
        alert(error.message + ": Due to overlapping conflicts."); // Show error message
        router.push("/"); // Redirect to homepage after message
      }
    }
    else if(taskData.type === "anti"){
      try{
        const antiTask = await createTask(taskData)
        alert("Task created successfully!"); // Show success message

        // Deletes the associated recurring task if it exists
        const recurTaskID = antiTask.cancelled_task_id
        if (recurTaskID !== 0){
          await deleteTask(recurTaskID)
          alert("A task was deleted")
        }
        router.push("/"); // Redirect to homepage after task creation
      } catch (error) {
        alert(error.message + ": Due to overlapping conflicts."); // Show error message
        router.push("/"); // Redirect to homepage after message
      }
    }

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
