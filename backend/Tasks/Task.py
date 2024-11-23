# Task Class represents a general task with specific attributes
class Task:
  """The constructor called __init__, which is a special method in Python classes 
    that initializes an object of the Task class with the following attributes: task_id, title, and description.
    task_id: a unique identifier for the task
    title: the title of the task
    description: a brief description of the task"""
  def __init__(self, task_id, title, description):
    # Initialize the task with the given task_id, title, and description (basically like this. in java)
    self.task_id = task_id
    self.title = title
    self.description = description

  """The to_dict method converst the Task object into a dictionary representation."""
  def to_dict(self):
    # Returns a dictionary representation of the task (like a JSON format)
    return {
      "id": self.task_id,
      "title": self.title,
      "description": self.description,
    }
