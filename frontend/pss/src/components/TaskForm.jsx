import { useState, useEffect } from "react";

export default function TaskForm(
  { 
    onSubmit, 
    initialValues = {},
  }
) 

{
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(initialValues.description ||"");
  const [type, setType] = useState(initialValues.type ||"transient");
  const [frequency, setFrequency] = useState(initialValues.frequency || "");
  const [startDate, setStartDate] = useState(initialValues.start_date || "");
  const [endDate, setEndDate] = useState(initialValues.end_date || "");
  const [startTime, setStartTime] = useState(initialValues.start_time || "");
  const [duration, setDuration] = useState(initialValues.duration || 0);
  const [cancelledTaskId, setCancelledTaskId] = useState(initialValues.cancelledTaskId || ""); // For Anti-Task

  // Update form fields when `initialValues` change (for editing)
  useEffect(() => {
    // Check if 'initialValues' has a valid ID indicating an edit operation
    if (initialValues && initialValues.id) {
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setType(initialValues.type || "transient");
      setFrequency(initialValues.frequency || "");
      setStartDate(initialValues.start_date || "");
      setEndDate(initialValues.end_date || "");
      setStartTime(initialValues.start_time || "");
      setDuration(initialValues.duration || 0);
      setCancelledTaskId(initialValues.cancelled_task_id || "");
    }
  }, [initialValues]);

  const recurringKeywords = ["Class", "Study", "Sleep", "Exercise", "Work", "Meal"]
  const transientKeywords = ["Visit", "Shopping", "Appointment"]
  const antiKeywords = ["Cancellation"]

  useEffect(() => {

    if(recurringKeywords.includes(title)){
      setType("recurring")
    }
    else if(transientKeywords.includes(title)){
      setType("transient")
    }
    else if(antiKeywords.includes(title)){
      setType("anti")
    }
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { 
      title, 
      description, 
      type,
      start_date: startDate,
      start_time: startTime,
      duration: Number(duration),
      date_time: `${startDate}T${startTime}:00`,
    };

    if (type === "recurring") {
      taskData.frequency = frequency;
      taskData.end_date = endDate;
    } else if (type === "anti") {
      taskData.cancelled_task_id = cancelledTaskId;
    }

    onSubmit(taskData);

    // Reset form fields
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
