from .Task import Task

# RecurringTask inherits from the Task Class
class RecurringTask(Task):
  """The constructor __init__ initializes a new RecurringTask with the given task_id, title, description, and frequency."""
  def __init__(self, task_id, title, description, start_time, duration, start_date, date_time, frequency, end_date):
    # super calls the __init__ method of the parent class Task to initialize the task with the given task_id, title, and description
    super().__init__(task_id, title, description, "recurring", start_time, duration, start_date, date_time)
    # Adds an attribute frequency which stores how often the task recurs
    self.frequency = frequency  # e.g., "daily", "weekly"
    # Adds an attribute end_date which stores the date the task ends
    self.end_date = end_date

  """The to_dict method converts the RecurringTask object into a dictionary representation."""
  def to_dict(self):
    # super calls the method of the parent class Task
    task_dict = super().to_dict()
    # Adds the frequency attribute to the dictionary
    task_dict["frequency"] = self.frequency
    # Adds the end_date attribute to the dictionary
    task_dict["end_date"] = self.end_date
    return task_dict
