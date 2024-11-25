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
    <div>
      <h1 className="text-2xl font-bold">Create a Task</h1>
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
}
