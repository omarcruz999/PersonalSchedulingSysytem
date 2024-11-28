# Task Class represents a general task with specific attributes
class Task:
  """The constructor called __init__, which is a special method in Python classes 
    that initializes an object of the Task class with the following attributes: task_id, title, and description.
    task_id: a unique identifier for the task
    title: the title of the task
    description: a brief description of the task"""
  def __init__(self, task_id, title, description, task_type, start_time, duration, start_date):
    # Initialize the task with the given task_id, title, and description (basically like this. in java)
    self.task_id = task_id
    self.title = title
    self.description = description
    self.task_type = task_type
    self.start_time = start_time
    self.duration = duration
    self.start_date = start_date

  """The to_dict method converst the Task object into a dictionary representation."""
  def to_dict(self):
    # Returns a dictionary representation of the task (like a JSON format)
    return {
      "id": self.task_id,
      "title": self.title,
      "description": self.description,
      "task_type": self.task_type,
      "start_time" : self.start_time,
      "duration": self.duration,
      "start_date" : self.start_date
    }
