export default function TaskList({ tasks, onDelete }) {
  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border-b py-2">
              <h2 className="text-lg font-medium">{task.title}</h2>
              <p>{task.description}</p>
              <span className="text-sm">Type: {task.type}</span>
              {task.frequency && <span> | Frequency: {task.frequency}</span>}
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available. Create one!</p>
      )}
    </div>
  );
}
