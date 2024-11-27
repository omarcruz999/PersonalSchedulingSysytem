export default function TaskList({ tasks, onDelete, onEdit }) {
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
                      <button className="font-medium text-black" style={{ display: "inline" }}
                        data-modal-target="editTaskModal" data-modal-toggle="editTaskModal" id="taskName">{task.title}</button>
                      {/* Task Times (Start Time + End Time) shows duration */}
                      <p className="text-sm text-gray-500" id="taskTime">at {task.start_time} to {task.duration}</p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {/* Task Date */}
                      <h2 className="font-medium text-black text-right min-h-[1.5rem]" id="taskDayName">Today</h2>
                      <p className="text-sm text-gray-500 text-right" id="taskDates">{task.start_date}</p>
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

                      {/* Edit Button */}
                      <button
                          onClick={() =>
                              onEdit(task.id, {
                                  title: "Updated Task Title",
                                  description: "Updated description",
                              })
                          }
                          className="text-blue-500"
                      >
                          Edit
                      </button>

                      {/* Delete Button */}
                      <button
                          onClick={() => onDelete(task.id)}
                          className="text-red-500 ml-2"
                      >
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
