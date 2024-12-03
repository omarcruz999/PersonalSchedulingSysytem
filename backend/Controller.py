from Model import TaskModel

# TaskController class is responsible for handling task creation, fetching all tasks, and deleting a task.
class TaskController:
  """Constructor __init__ initializes an instance of TaskModel and assignes it to this class model."""
  def __init__(self):
    self.model = TaskModel()

  """create_task method handles the creation of a new task"""
  def create_task(self, task_type, title, description, start_time, duration, start_date, **kwargs):
    # Call the create_task method from the model and pass the task_type, title, description, and frequency
    try:
      task = self.model.create_task(task_type, title, description, start_time, duration, start_date, **kwargs)
      return task.to_dict()
    except ValueError as e:
      return {"error": str(e)}

  """get_all_tasks method handles the retrieval/fetching of all tasks"""
  def get_all_tasks(self):
    # Call the get_tasks method from the model and return the tasks
    return self.model.get_tasks()

  """delete_task method handles the deletion of a task"""
  def delete_task(self, task_id):
    # Call the delete_task method from the model and pass the task_id
    existing_task = next((task for task in self.model.tasks if task.task_id == task_id), None)
    if existing_task:
      self.model.delete_task(task_id)
      return {"message": "Task deleted successfully"}
    else: 
      return {"error": "Task not found"}
    
  def edit_task(self, task_id, **updates):
    # Call the edit_task method from the model and pass the task_id and updates
    updated_task = self.model.edit_task(task_id, **updates)
    if (updated_task):
      return updated_task.to_dict()
    else: 
      return {"error": "Task not found"}
    
  def get_task_by_id(self, task_id):
    # Call the get_task_by_id method from the model and pass the task_id
    task = next((task for task in self.model.tasks if task.task_id == task_id), None)
    if task:
      return task.to_dict()
    else:
      return {"error": "Task not found"}

  def add_date(self, date):
    try:
      return self.model.add_date(date)
    except ValueError as e:
      return {"error": str(e)}
  
  def get_dates(self):
    return self.model.get_dates()
