import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("transient");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [cancelledTaskId, setCancelledTaskId] = useState(""); // For Anti-Task

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { 
      title, 
      description, 
      type,
      start_date: startDate,
      start_time: startTime,
      duration,
    };

    taskData.duration = Number(duration);

    if (type === "recurring") {
      taskData.frequency = frequency;
      taskData.end_date = endDate;
    } else if (type === "anti") {
      taskData.cancelled_task_id = cancelledTaskId;
    }

    onSubmit(taskData);

    setTitle("");
    setDescription("");
    setType("transient");
    setFrequency("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setDuration(0);
    setCancelledTaskId("");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="addATaskName"
            className="block mb-2 text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="addATaskName"
            id="addATaskName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Enter Task name"
            required
          />
        </div>

        {/* Type and Frequency Fields */}
        <div className="flex justify-between space-x-4">
          {/* Type Field */}
          <div className="w-1/2">
            <label
              htmlFor="addATaskType"
              className="block mb-2 text-sm font-medium text-white"
            >
              Type
            </label>
            <select
              id="addATaskType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            >
              <option value="recurring">Recurring Task</option>
              <option value="transient">Transient Task</option>
              <option value="anti">Anti-Task</option>
            </select>
          </div>

          {/* Frequency Field */}
          {type === "recurring" && (
            <div className="w-1/2">
              <label
                htmlFor="addATaskFrequency"
                className="block mb-2 text-sm font-medium text-white"
              >
                Frequency
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    className="form-check-input h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    type="radio"
                    name="frequency"
                    id="frequencyDailyRadio"
                    value="daily"
                    checked={frequency === "daily"}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  <label
                    className="ml-2 text-sm text-white"
                    htmlFor="frequencyDailyRadio"
                  >
                    Daily
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    className="form-check-input h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    type="radio"
                    name="frequency"
                    id="frequencyWeeklyRadio"
                    value="weekly"
                    checked={frequency === "weekly"}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  <label
                    className="ml-2 text-sm text-white"
                    htmlFor="frequencyWeeklyRadio"
                  >
                    Weekly
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cancelled Task ID Field for Anti-Tasks */}
        {type === "anti" && (
          <div>
              <label htmlFor="addCancelledTaskId" className="block mb-2 text-sm font-medium text-white">
                  Cancelled Task ID
              </label>
              <input
                  type="text"
                  id="addCancelledTaskId"
                  value={cancelledTaskId}
                  onChange={(e) => setCancelledTaskId(e.target.value)}
                  placeholder="Enter Cancelled Task ID"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
              />
          </div>
        )}

        {/* Start Date and End Date Fields */}
        <div className="flex justify-between space-x-4">
          {/* Start Date */}
          <div className="w-1/2">
            <label
              htmlFor="addATaskStartDate"
              className="block mb-2 text-sm font-medium text-white"
            >
              Start Date
            </label>
            <input
              type="date"
              name="addATaskStartDate"
              id="addATaskStartDate"
              className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Enter A Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}

          {type === "recurring" && (
          <div className="w-1/2">
            <label
              htmlFor="addATaskEndDate"
              className="block mb-2 text-sm font-medium text-white"
            >
              End Date
            </label>
            <input
              type="date"
              name="addATaskEndDate"
              id="addATaskEndDate"
              className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Enter A Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          )}
        </div>

        {/* Start Time and Duration Fields */}
        <div className="flex justify-between space-x-4">
          {/* Start Time */}
          <div className="w-1/2">
            <label
              htmlFor="addATaskStartTime"
              className="block mb-2 text-sm font-medium text-white"
            >
              Start Time
            </label>
            <input
              type="time"
              name="addATaskStartTime"
              id="addATaskStartTime"
              className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Enter A Time"
              min="00:00"
              max="23:45"
              step="900"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          {/* Duration */}
          <div className="w-1/2">
            <label
              htmlFor="addATaskDuration"
              className="block mb-2 text-sm font-medium text-white"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              name="addATaskDuration"
              id="addATaskDuration"
              className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Enter Duration"
              value={duration}
              min="15"
              step="15"

              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="addATaskDescription"
            className="block mb-2 text-sm font-medium text-white"
          >
            Description
          </label>
          <input
            type="text"
            name="addATaskDescription"
            id="addATaskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Enter Description"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white inline-flex items-center focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Add New Task
          </button>
        </div>
      </form>
    </div>
  );
}
