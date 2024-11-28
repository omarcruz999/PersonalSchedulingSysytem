from .Task import Task

# TransientTask inherits from the Task class
class TransientTask(Task):
  """The constructor __init__ initializes a new TransientTask with the given task_id, title, and description."""
  def __init__(self, task_id, title, description, start_time, duration, start_date):
    # super calls the __init__ method of the parent class Task to initialize the task
    super().__init__(task_id, title, description, "transient", start_time, duration, start_date)

  """The to_dict method converts the TransientTask object into a dictionary representation."""
  def to_dict(self):
    # super calls the method of the parent class Task
    task_dict = super().to_dict()
    return task_dict
