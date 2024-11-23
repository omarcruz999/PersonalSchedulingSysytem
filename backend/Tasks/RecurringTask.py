from .Task import Task

# RecurringTask inherits from the Task Class
class RecurringTask(Task):
  """The constructor __init__ initializes a new RecurringTask with the given task_id, title, description, and frequency."""
  def __init__(self, task_id, title, description, frequency):
    # super calls the __init__ method of the parent class Task to initialize the task with the given task_id, title, and description
    super().__init__(task_id, title, description)
    # Adds an attribute type and sets it to "recurring"
    self.type = "recurring"
    # Adds an attribute frequency which stores how often the task recurs
    self.frequency = frequency  # e.g., "daily", "weekly"

  """The to_dict method converts the RecurringTask object into a dictionary representation."""
  def to_dict(self):
    # super calls the method of the parent class Task
    task_dict = super().to_dict()
    # Adds two new key-value pairs to the dictionary
    task_dict["type"] = self.type
    # Adds the frequency attribute to the dictionary
    task_dict["frequency"] = self.frequency
    return task_dict
