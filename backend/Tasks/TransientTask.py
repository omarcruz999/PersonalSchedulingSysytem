from .Task import Task

# TransientTask inherits from the Task class
class TransientTask(Task):
  """The constructor __init__ initializes a new TransientTask with the given task_id, title, and description."""
  def __init__(self, task_id, title, description):
    # super calls the __init__ method of the parent class Task to initialize the task
    super().__init__(task_id, title, description)
    # Adds an additional attribute type to the TransientTask class
    self.type = "transient"

  """The to_dict method converts the TransientTask object into a dictionary representation."""
  def to_dict(self):
    # super calls the method of the parent class Task
    task_dict = super().to_dict()
    # Adds a new key-value pair to the dictionary
    task_dict["type"] = self.type
    return task_dict
