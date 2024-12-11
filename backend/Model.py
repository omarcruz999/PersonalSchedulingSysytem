from Tasks.AntiTask import AntiTask
from Tasks.RecurringTask import RecurringTask
from Tasks.TransientTask import TransientTask
from datetime import datetime, time, timedelta

# TaskModel class represents the model of the task
class TaskModel:
  """Constructor __init__ initializes an empty list of tasks and a task_id_counter."""
  def __init__(self):
    # Empty list to store tasks
    self.tasks = []

    # Counter to assign unique IDs to tasks
    self.task_id_counter = 1

  """create_task method handles the creation of a new task"""
  def create_task(self, task_type, title, description, start_time, duration, start_date, date_time, **kwargs):
    # Creates a new task based on the type and adds it to the tasks list
    # The kwargs parameter allows for additional arguments to be passed to the method

    # Checks for valid duration
    if not self.isValidTime(start_time, duration):
      raise Exception("Invalid duration")

    # Checks to see if the start_time interferes with other tasks
    cancelled_task_id = 0
    for task in self.tasks:
      other_start_time = task.get_start_time()
      other_duration = task.get_duration()

      # Checks to see if non anti tasks have the same date and overlaps
      if (task_type != "anti" and task.get_start_date() == start_date and self.hasOverlap(other_start_time, other_duration, start_time, duration)):
        raise Exception("Tasks conflicts with other tasks")
      # Checks to see if anti-tasks have the same date, time, and duration as a recurring tasks
      elif (task_type == "anti" and task.get_task_type() == "recurring" and task.get_start_date() == start_date and task.get_start_time() == start_time and task.get_duration() == duration):
        cancelled_task_id = task.get_task_id()
    
    if task_type == "anti":
        task = AntiTask(self.task_id_counter, title, description, start_time, duration, start_date, date_time, cancelled_task_id)
    elif task_type == "recurring":
        frequency = kwargs.get("frequency")
        end_date = kwargs.get("end_date")
        task = RecurringTask(self.task_id_counter, title, description, start_time, duration, start_date, date_time, frequency, end_date)
    elif task_type == "transient":
        task = TransientTask(self.task_id_counter, title, description, start_time, duration, start_date, date_time)
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

  """edit_task method updates a task with new information"""
  def edit_task(self, task_id, **updates):
    # updates: a dictionary of attributes to update

    # Finds the task with the specified ID
    for task in self.tasks:

      other_start_time = task.get_start_time()
      other_duration = task.get_duration()
      edited_start_time = updates.get("start_time", task.start_time)
      edited_duration = updates.get("duration", task.duration)
      
      # Checks if the other tasks time overlap with the edited task
      if (
        task.get_task_id() != task_id and
        updates.get("start_date", task.start_date) == task.get_start_date() and
        self.hasOverlap(
          other_start_time,
          other_duration,
          edited_start_time,
          edited_duration
        )
      ):
        return None

      if task.get_task_id() == task_id:

        # Checks to see if time is within the same day
        edited_start_time = updates.get("start_time", task.start_time)
        edited_duration = updates.get("duration", task.duration)
        if not self.isValidTime(edited_start_time, edited_duration):
          return None
        
        # Updates the task attributes with the new information
        task.set_title(updates.get("title", task.title))
        task.set_description(updates.get("description", task.description))
        task.set_start_time(updates.get("start_time", task.start_time))
        task.set_duration(updates.get("duration", task.duration))
        task.set_start_date(updates.get("start_date", task.start_date))
            
        # Check for specific updates for subclasses
        if isinstance(task, RecurringTask):
          task.set_frequency(updates.get("frequency", task.frequency))
          task.set_end_date(updates.get("end_date", task.end_date))
        elif isinstance(task, AntiTask):
          task.set_cancelled_task_id(updates.get("cancelled_task_id", task.cancelled_task_id))

        # Returns the updated task
        return task
    
    # If the task is not found return none
    return None

  """ hasOverlap method checks for overlap between tasks """
  def hasOverlap(self, startTime, duration, newTime, newDuration):
    
    isValid = False

    # Converts the times to datetimes
    start1 = self.getDateTime(startTime)
    end1 = start1 + timedelta(minutes=duration)
    start2 = self.getDateTime(newTime)
    end2 = start2 + timedelta(minutes=newDuration)

    # Checks to see if the editedTime interferes with another task
    if not (end1 <= start2 or end2 <= start1):
      isValid = True
    
    return isValid
  
  """ isValidTime method checks to see if the time is within the same day """
  def isValidTime(self, startTime, duration):

    # Converts the times to datetimes
    dateStartTime = self.getDateTime(startTime)
    dateEndTime = dateStartTime + timedelta(minutes=duration)

    return dateStartTime.day == dateEndTime.day


  """getDateTime method returns a string into a comparable datetime"""
  def getDateTime(self, time):

    parsed_time = datetime.strptime(time, "%H:%M").time()
    datetime_value = datetime.combine(datetime.min, parsed_time)
    return datetime_value