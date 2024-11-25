from Tasks.AntiTask import AntiTask
from Tasks.RecurringTask import RecurringTask
from Tasks.TransientTask import TransientTask

# TaskModel class represents the model of the task
class TaskModel:
  """Constructor __init__ initializes an empty list of tasks and a task_id_counter."""
  def __init__(self):
    # Empty list to store tasks
    self.tasks = []
    # Counter to assign unique IDs to tasks
    self.task_id_counter = 1

  """create_task method handles the creation of a new task"""
  def create_task(self, task_type, title, description, frequency=None):
    # Creates a new task based on the type and adds it to the tasks list
    if task_type == "anti":
        task = AntiTask(self.task_id_counter, title, description)
    elif task_type == "recurring":
        task = RecurringTask(self.task_id_counter, title, description, frequency)
    elif task_type == "transient":
        task = TransientTask(self.task_id_counter, title, description)
    else:
        raise ValueError("Invalid task type")

    # Adds the task to the task list
    self.tasks.append(task)
    # Increment the  task ID counter
    self.task_id_counter += 1
    # Returns the new created task
    return task

  """get_tasks method retrieves all tasks"""
  def get_tasks(self):
    # Iterates through the tasks list and calls the to_dict method on each task to convert it to a dictionary format
    return [task.to_dict() for task in self.tasks]

  """delete_task method deletes a task by its ID"""
  def delete_task(self, task_id):
    # Creates a new list of tasks, excluding the task with the specified ID, and assigns it to the new list back to the selft.tasks removing the task with the specified ID
    self.tasks = [task for task in self.tasks if task.task_id != task_id]