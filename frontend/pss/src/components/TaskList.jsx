export default function TaskList({ tasks, onDelete, onEdit }) {

   // Function to format date from YYYY-MM-DD to MM-DD-YYYY
   const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  // Function to determine if the date is today or tomorrow
  const getDayName = (dateString) => {
    if (!dateString) return '';

      // split dateString and get current date
      const [year, month, day] = dateString.split('-');
      const taskDate = new Date(year, month-1, day);
      const today = new Date();

      // Set to equal time to avoid errors 
      taskDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      // Calculate difference in days
      const differenceInTime = taskDate.getTime() - today.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays === 0){
        return 'Today';
      } else if (differenceInDays === 1){
        return 'Tomorrow';
      }
  }

  // Function to format time
  const formatTime = (timeString) => {
    const [hour, minutes] = timeString.split(':');
    
    if(hour > 12){
      return `${hour - 12}:${minutes} pm`
    } else {
      return `${timeString} am`
    }
  }


  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>

              {/* Task Card */}
              <main className="bg-white shadow rounded-lg">
                <div className="p-4 border-b space-y-4 rounded-lg">
                  <div className="flex justify-between">

                    <div>
                      {/* Task Name*/}
                      <button className="font-medium text-black"
                        style={{ display: "inline" }}
                        id="taskName"
                        onClick={() =>
                          onEdit(task.id, {
                            title: "Updated Task Title",
                            description: "Updated description",
                          })
                        }
                      >{task.title}</button>
                      {/* Task Times (Start Time + End Time) shows duration */}
                      <p className="text-sm text-gray-500" id="taskTime">At {formatTime(task.start_time)} | Duration: {task.duration} minutes</p>  
                    </div>

                    <div className="flex flex-col items-end">
                      {/* Task Date */}
                      <h2 className="font-medium text-black text-right min-h-[1.5rem]" id="taskDayName">{getDayName(task.start_date)}</h2>
                      <p className="text-sm text-gray-500 text-right" id="taskDates">{formatDate(task.start_date)}</p>
                    </div>

                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">

                        <div>
                          {/* Completion Checkbox */}
                          <input type="checkbox" className="rounded border-gray-300" style={{ display: "inline" }}
                            id="taskCompletionInput" />
                          {/* Task Description */}
                          <p className="text-base text-gray-500" style={{ display: "inline" }} id="taskDescription">
                            {"  " + task.description}</p>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 ml-2">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </main>

            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-6 text-3xl">No tasks available. Create one!</p>
      )}
    </div>
  );
}
