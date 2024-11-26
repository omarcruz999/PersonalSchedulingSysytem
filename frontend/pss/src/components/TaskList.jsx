export default function TaskList({ tasks, onDelete }) {
  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {/* <h2 className="text-lg font-medium">{task.title}</h2>
              <p>{task.description}</p>
              <span className="text-sm">Type: {task.type}</span>
              {task.frequency && <span> | Frequency: {task.frequency}</span>}
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 ml-4"
              >
                Delete
              </button> */}
              <main className="bg-white shadow rounded-lg">
                <div className="p-4 border-b space-y-4 rounded-lg">
                  <div className="flex justify-between">
                    
                    <div>
                      {/* Task Name*/}
                      <button className="font-medium text-black" style={{ display: "inline" }}
                        data-modal-target="editTaskModal" data-modal-toggle="editTaskModal" id="taskName">{task.title}</button>
                      {/* Task Times (Start Time + End Time) shows duration */}
                      <p className="text-sm text-gray-500" id="taskTime">at 9 am to 10 pm</p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {/* Task Date */}
                      <h2 className="font-medium text-black text-right min-h-[1.5rem]" id="taskDayName">Today</h2>
                      <p className="text-sm text-gray-500 text-right" id="taskDates">11/22/2024</p>
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
                      <div className="text-sm text-gray-500">
                        <button id="taskDeleteButton" data-modal-target="deleteModal"
                          data-modal-toggle="deleteModal" style={{ color: "red" }} onClick={() => onDelete(task.id)}>Delete</button>
                      </div>
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
