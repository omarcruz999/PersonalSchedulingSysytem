import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("transient");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, type };
    if (type === "recurring") {
      taskData.frequency = frequency;
    }
    onSubmit(taskData);
    setTitle("");
    setDescription("");
    setType("transient");
    setFrequency("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="transient">Transient</option>
          <option value="recurring">Recurring</option>
          <option value="anti">Anti-Task</option>
        </select>
      </div>
      {type === "recurring" && (
        <div>
          <label className="block font-medium">Frequency:</label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g., daily, weekly"
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Task
      </button>
    </form>
  );
}
