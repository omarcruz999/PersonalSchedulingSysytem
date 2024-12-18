const BASE_URL = "http://127.0.0.1:5000";

// Fetch all tasks
export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

// Create a new task
export async function createTask(taskData) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
}

// Delete a task
export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete task");
  return response.json();
}

// Edit a task
export async function editTask(taskId, updates) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) throw new Error(`Failed to update task with ID ${taskId}`);
  return response.json();
}

// Fetch a task by ID
export async function fetchTaskById(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`);
  if (!response.ok) throw new Error(`Failed to fetch task with ID ${taskId}`);
  return response.json();
}

// Upload a task through a JSON file
export async function uploadSchedule(file) {
  // Create a new FormData object which allows you to construct a set of key/value pairs representing form fields and their values
  const formData = new FormData(); 
  // Append the file to the FormData object
  formData.append("file", file);

  // Send a POST request to the server with the FormData object
  const response = await fetch(`${BASE_URL}/upload-schedule`, {
    method: "POST",
    body: formData,
  });

  // If the response is not OK, throw an error
  if (!response.ok) throw new Error("Failed to upload schedule");
  // Return the response as JSON
  return response.json();
}