import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("transient-task");
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, type, startDate, endDate, startTime, duration };
    if (type === "recurring-task") {
      taskData.frequency = frequency;
    }
    onSubmit(taskData);
    // Reset form fields
    setTitle("");
    setDescription("");
    setType("transient-task");
    setFrequency("daily");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setDuration(15);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl p-4">

        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="addATaskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="addATaskName"
            id="addATaskName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter Task name"
            required
          />
        </div>

        {/* Type and Frequency */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 mb-4">
          {/* Type */}
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <label htmlFor="addATaskType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Type
            </label>
            <select
              id="addATaskType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option value="">Select type</option>
              <option value="recurring-task">Recurring Task</option>
              <option value="transient-task">Transient Task</option>
              <option value="anti-task">Anti-Task</option>
            </select>
          </div>

          {/* Frequency (Only for Recurring Tasks) */}
         
            <div className="w-full sm:w-1/2">
              <label htmlFor="addATaskFrequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Frequency
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    className="form-check-input h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    type="radio"
                    name="frequency"
                    id="frequencyDailyRadio"
                    value="daily"
                    checked={frequency === "daily"}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  <label htmlFor="frequencyDailyRadio" className="ml-2 text-sm text-white">
                    Daily
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    className="form-check-input h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    type="radio"
                    name="frequency"
                    id="frequencyWeeklyRadio"
                    value="weekly"
                    checked={frequency === "weekly"}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  <label htmlFor="frequencyWeeklyRadio" className="ml-2 text-sm text-white">
                    Weekly
                  </label>
                </div>
              </div>
            </div>
          
        </div>

        {/* Start Date and End Date */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 mb-4">
          {/* Start Date */}
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <label htmlFor="addATaskStartDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Start Date
            </label>
            <input
              type="date"
              name="addATaskStartDate"
              id="addATaskStartDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* End Date */}
          <div className="w-full sm:w-1/2">
            <label htmlFor="addATaskEndDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              End Date
            </label>
            <input
              type="date"
              name="addATaskEndDate"
              id="addATaskEndDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Start Time and Duration */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 mb-4">
          {/* Start Time */}
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
            <label htmlFor="addATaskStartTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Start Time
            </label>
            <input
              type="time"
              name="addATaskStartTime"
              id="addATaskStartTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              min="00:00"
              max="23:45"
              step="900"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* Duration */}
          <div className="w-full sm:w-1/2">
            <label htmlFor="addATaskDuration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="addATaskDuration"
              id="addATaskDuration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              step="15"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="addATaskDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            type="text"
            name="addATaskDescription"
            id="addATaskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter a Description"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New Task
          </button>
        </div>
      </form>
    </div>
  );
}
