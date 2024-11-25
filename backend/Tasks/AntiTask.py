from .Task import Task

# AntiTask inherits from the Task class, meaning it will have all the properties and methods of the Task class, but can also extend them
class AntiTask(Task):
  """Constructor __init__ initializes a new AntiTask with the given task_id, title, and description."""
  def __init__(self, task_id, title, description):
    # super calls the __init__ method of the parent class Task to initialize the task with the given task_id, title, and description
    super().__init__(task_id, title, description)
    # Adds an additional attribute type to the AntiTask class
    self.type = "anti"

  """The to_dict method converts the AntiTask object into a dictionary representation."""
  def to_dict(self):
    # super calls the method of the parent class Task 
    task_dict = super().to_dict()
    # Adds a new key-value pair to the dictionary
    task_dict["type"] = self.type
    return task_dict