import Link from "next/link";
import dayjs from "dayjs";

export default function TaskList({ 
    tasks, 
    mode,
    onDelete, 
  }
) 

{
  const dates = []
  const months = []

   // Function to format date from YYYY-MM-DD to MM-DD-YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const formatMonth = (dateString) => {
    const [year, month, day] = dateString.split('-');

    if (["01", "03", "05", "07", "08", "10", "12"].includes(month)) 
      return `${month}/1/${year} - ${month}/31/${year}`;
    else if (["04", "06", "09", "11"].includes(month)) 
      return `${month}/1/${year} - ${month}/30/${year}`;
    else if (month == "02" && dayjs(`${year}-01-01`).isLeapYear()) 
      return `${month}/1/${year} - ${month}/29/${year}`;
    else 
      return `${month}/1/${year} - ${month}/28/${year}`;
    
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

  const displayDateHeader = (date) => {
    return(
      <>
        <div className="p-4 mt-4 border-b space-y-4 rounded-lg bg-slate-500 ">
          <p className="text-sm text-white text-left" id="taskDates">{formatDate(date)}</p>
        </div>
      </>
    )
  }

  const displayMonthHeader = (date) => {
    return(
      <>
        <div className="p-4 mt-4 border-b space-y-4 rounded-lg bg-slate-500 ">
          <p className="text-sm text-white text-left" id="taskDates">{formatMonth(date)}</p>
        </div>
      </>
    )
  }

  const handleAddDate = (date) => {
    if (mode == "daily") 
      if (!dates.includes(date)) {
        dates.push(date) 
        return displayDateHeader(date)     
      }
    if (mode == "monthly") {
      const [year, month, day] = date.split('-');
      if (!months.some(([m, y]) => m === month && y === year)) {
        months.push([month, year]) 
        return displayMonthHeader(date)
      }
    }
  }

  return (
    <div>              
      {tasks.length > 0 ? (
        <ul> 
          {tasks.map((task) => (
            <li key={task.id}>
              {/* Task Card */}              
              {handleAddDate(task.start_date)}
              <main className="bg-white shadow rounded-lg">
                <div className="p-4 border-b space-y-4 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      {/* Task Name*/}
                      <Link href={`/edit-task/${task.id}`}>
                        <button className="font-medium text-black"
                          style={{ display: "inline" }}
                          id="taskName"
                          // onClick={() =>
                          //   onEdit(task.id, {
                          //     title: "Updated Task Title",
                          //     description: "Updated description",
                          //   })
                          // }
                        >
                          {task.title}
                        </button>
                      </Link>

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
