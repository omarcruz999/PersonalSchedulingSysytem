from Model import TaskModel

# TaskController class is responsible for handling task creation, fetching all tasks, and deleting a task.
class TaskController:
  """Constructor __init__ initializes an instance of TaskModel and assignes it to this class model."""
  def __init__(self):
    self.model = TaskModel()

  """create_task method handles the creation of a new task"""
  def create_task(self, task_type, title, description, frequency=None):
    # Call the create_task method from the model and pass the task_type, title, description, and frequency
    return self.model.create_task(task_type, title, description, frequency)

  """get_all_tasks method handles the retrieval/fetching of all tasks"""
  def get_all_tasks(self):
    # Call the get_tasks method from the model and return the tasks
    return self.model.get_tasks()

  """delete_task method handles the deletion of a task"""
  def delete_task(self, task_id):
    # Call the delete_task method from the model and pass the task_id
    self.model.delete_task(task_id)
