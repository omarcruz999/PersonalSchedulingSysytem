from .Task import Task

# AntiTask inherits from the Task class, meaning it will have all the properties and methods of the Task class, but can also extend them
class AntiTask(Task):
  """Constructor __init__ initializes a new AntiTask with the given task_id, title, and description."""
  def __init__(self, task_id, title, description, start_time, duration, start_date, date_time, cancelled_task_id):
    # super calls the __init__ method of the parent class Task to initialize the task with the given task_id, title, and description
    super().__init__(task_id, title, description, "anti", start_time, duration, start_date, date_time)
    # Adds an additional attribute type to the AntiTask class
    self.cancelled_task_id = cancelled_task_id

  """The to_dict method converts the AntiTask object into a dictionary representation."""
  def to_dict(self):
    # super calls the method of the parent class Task 
    task_dict = super().to_dict()
    # Adds a new key-value pair to the dictionary
    task_dict["cancelled_task_id"] = self.cancelled_task_id
    return task_dict