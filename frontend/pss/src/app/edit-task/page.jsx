export default function EditTaskPage() {
  return (

    // Edit Task Page Set Up 
    <div className=" w-screen h-screen relative bg-gray-700 shadow justify-center">

      <div className="flex justify-center">

        {/* Header Div */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 w-1/2" >

          {/* Title Header */}
          <h3 className="text-lg font-semibold text-white">
            Edit Task
          </h3>

          {/* Exit Button */}
          <button
            type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
          //onClick={() => router.push("/")}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14">

              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>

          </button>

        </div> {/* End Header Div */}
      </div>

      {/* Edit Task Form Div */}
      <div className="flex justify-center">

        <form
          //onSubmit={handleSubmit} 
          className="w-1/2 space-y-4">

          {/* Name Field */}
          <div>
            <label
              htmlFor="addATaskName"
              className="block mb-2 text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              name="addATaskName"
              id="addATaskName"
              //value={title}
              //onChange={(e) => setTitle(e.target.value)}
              className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="Enter Task name"
              required />
          </div> {/* End Name Field */}



          {/* Type and Frequency Fields */}
          <div className="flex justify-between space-x-4">

            {/* Type Field */}
            <div className="w-1/2">

              <label
                htmlFor="addATaskType"
                className="block mb-2 text-sm font-medium text-white">
                Type
              </label>

              {/* Type Drop Down */}
              <select
                id="addATaskType"
                //value={type}
                //onChange={(e) => setType(e.target.value)}
                required
                className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              >
                <option value="recurring">Recurring Task</option>
                <option value="transient">Transient Task</option>
                <option value="anti">Anti-Task</option>
              </select>

            </div> {/* End Type Field */}

            {/* Frequency Field FIX */}
            {/* { type === "recurring" &&  ( */}
            <div className="w-1/2">

              <label
                htmlFor="addATaskFrequency"
                className="block mb-2 text-sm font-medium text-white">
                Frequency
              </label>

              <div className="flex space-x-4">
                <div className="flex items-center">
                  {/* Daily Radio Button */}
                  <input
                    className="form-check-input h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    type="radio"
                    name="frequency"
                    id="frequencyDailyRadio"
                  //value="daily"
                  //checked={frequency === "daily"}
                  // onChange={(e) => setFrequency(e.target.value)}
                  />

                  <label
                    className="ml-2 text-sm text-white"
                    htmlFor="frequencyDailyRadio">
                    Daily
                  </label>

                </div>



                <div className="flex items-center">
                  {/* Weekly Radio Button */}
                  <input
                    className="form-check-input h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    type="radio"
                    name="frequency"
                    id="frequencyWeeklyRadio"
                  //value="weekly"
                  //checked={frequency === "weekly"}
                  //onChange={(e) => setFrequency(e.target.value)}
                  />

                  <label
                    className="ml-2 text-sm text-white"
                    htmlFor="frequencyWeeklyRadio">
                    Weekly
                  </label>

                </div>

              </div>
            </div>
            {/*)} */}
          </div>  {/* End Type and Frequency Fields */}




          {/* Cancelled Task ID Field for Anti-Tasks */}
          {/* {type === "anti" && ( */}
          <div>

            <label htmlFor="addCancelledTaskId" className="block mb-2 text-sm font-medium text-white">
              Cancelled Task ID
            </label>


            <input
              type="text"
              id="addCancelledTaskId"
              //value={cancelledTaskId}
              //onChange={(e) => setCancelledTaskId(e.target.value)}
              placeholder="Enter Cancelled Task ID"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
            />

          </div>
          {/*   )} */}  {/* End Cancelled Task ID Field for Anti-Tasks */}



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
                //value={startDate}
                //onChange={(e) => setStartDate(e.target.value)}
                required
              />

            </div>  {/* End Start Date Div */}

            {/* End Date */}
            {/* {type === "recurring" && ( */}
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
                //value={endDate}
                //onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            {/*  )} */}
          </div>  {/*End - Start Date and End Date Fields */}



          {/* Start Time and Duration Fields */}
          <div className="flex justify-between space-x-4">
            {/* Start Time */}
            <div className="w-1/2">
              <label
                htmlFor="addATaskStartTime"
                className="block mb-2 text-sm font-medium text-white">
                Start Time
              </label>

              {/* Start Time Input */}
              <input
                type="time"
                name="addATaskStartTime"
                id="addATaskStartTime"
                className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="Enter A Time"
                min="00:00"
                max="23:45"
                step="900"
                //value={startTime}
                //onChange={(e) => setStartTime(e.target.value)}
                required
              />

            </div>



            {/* Duration */}
            <div className="w-1/2">
              <label
                htmlFor="addATaskDuration"
                className="block mb-2 text-sm font-medium text-white">
                Duration (minutes)
              </label>

              {/* Duration Input */}
              <input
                type="number"
                name="addATaskDuration"
                id="addATaskDuration"
                className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="Enter Duration"
                //value={duration}
                min="15"
                step="15"
                //onChange={(e) => setDuration(e.target.value)}
                required
              />

            </div>
          </div>

          {/* Description Field */}
          <div>

            <label
              htmlFor="addATaskDescription"
              className="block mb-2 text-sm font-medium text-white">
              Description
            </label>

            {/* Text Input */}
            <input
              type="text"
              name="addATaskDescription"
              id="addATaskDescription"
              //value={description}
              //onChange={(e) => setDescription(e.target.value)}
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
              Edit Task
            </button>
          </div>

        </form>
      </div> {/* End Edit Task Form Div */}
    </div>
  );
}