from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from Controller import TaskController

# Create a Flask app
app = Flask(__name__)
# Enable CORS
CORS(app)

# Instantiate the TaskController
controller = TaskController()

# Defines an ednpoint at /tasks for any GET requests
@app.route('/tasks', methods=['GET'])
def get_tasks():
  # Retrieves all the tasks
  tasks = controller.get_all_tasks()
  # Returns the tasks as a JSON response
  return jsonify(tasks), 200

# Defines an endpoint at /tasks for any POST requests
@app.route('/tasks', methods=['POST'])
def create_task():
  # Retrieves the JSON data from the request
  data = request.json
  
  # Extracts the common attributes
  task_type = data.get("type")
  title = data.get("title")
  description = data.get("description")
  start_time = data.get("start_time")
  duration = data.get("duration")
  start_date = data.get("start_date")
  date_time = data.get("date_time")

  # Extracts the optional attributes
  frequency = data.get("frequency")  # For recurring tasks
  end_date = data.get("end_date")    # For recurring tasks
  cancelled_task_id = data.get("cancelled_task_id")  # For anti-tasks

  # Trys to create a new task with the given data
  try:
    task = controller.create_task(
      task_type=task_type, 
      title=title, 
      description=description,
      start_time=start_time,
      duration=duration,
      start_date=start_date, 
      date_time=date_time,
      frequency=frequency,
      end_date=end_date,
      cancelled_task_id=cancelled_task_id,
    )
    # Returns the newly created task as a JSON response
    return jsonify(task), 201
  except ValueError as e:
    return jsonify({"error": str(e)}), 400

# Defines an endpoint at /tasks/<task_id> for any DELETE requests by its task_id
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
  # Task_id is captured from the URL and passed to the delete_task method in the controller
  response = controller.delete_task(task_id)
  if ("error" in response):
    return jsonify(response), 404
  return jsonify(response), 200

# Defines an endpoint at /tasks/<task_id> to edit an existing task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
  data = request.json
  updated_task = controller.edit_task(task_id, **data)
  if ("error" in updated_task):
    return jsonify(updated_task), 404
  return jsonify(updated_task), 200

# Defines an endpoint at /tasks/<task_id> to get a task by its ID
@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task_by_id(task_id):
  task = controller.get_task_by_id(task_id)
  if ("error" in task):
    return jsonify(task), 404
  return jsonify(task), 200


# Defines an endpoint at /upload-schedule for uploading a schedule as JSON File
@app.route('/upload-schedule', methods=['POST'])
def upload_schedule():
  
  try:
    # Ensure the file is included in the request
    if 'file' not in request.files:
      # Return an error if no file is uploaded
      return jsonify({"error": "No file uploaded"}), 400

    # Load and parse the JSON file
    file = request.files['file']  # Retrieve the uploaded file
    schedule_data = json.load(file) # Load the JSON data using json.load

    # Check if schedule_data is a list or dictionary
    if isinstance(schedule_data, list):
      tasks = schedule_data  # Treat it as a list of tasks
    elif isinstance(schedule_data, dict):
      tasks = schedule_data.get("tasks", [])  # Extract tasks from a dictionary
    else:
      # Return an error if the JSON data is not a list or dictionary
      return jsonify({"error": "Invalid JSON format"}), 400

    # Validate the tasks
    if not isinstance(tasks, list):
      # Return an error if tasks is not a list
      return jsonify({"error": "Invalid JSON format: 'tasks' should be an array"}), 400

    # Create tasks and collect results
    created_tasks = []  # List to store created tasks
    errors = [] # List to store errors for invalid tasks

    # Iterate over each task in the tasks list
    for index, task_data in enumerate(tasks):
      try:
        # Extract required and optional fields
        task_type = task_data.get("task_type")
        title = task_data.get("title")
        description = task_data.get("description")
        start_time = task_data.get("start_time")
        duration = task_data.get("duration")
        start_date = task_data.get("start_date")
        date_time = task_data.get("date_time")
        frequency = task_data.get("frequency")  # For recurring tasks
        end_date = task_data.get("end_date")  # For recurring tasks
        cancelled_task_id = task_data.get("cancelled_task_id")  # For anti-tasks

        # Create the task by calling controller.create_task
        task = controller.create_task(
          task_type=task_type,
          title=title,
          description=description,
          start_time=start_time,
          duration=duration,
          start_date=start_date,
          date_time=date_time,
          frequency=frequency,
          end_date=end_date,
          cancelled_task_id=cancelled_task_id,
        )
        
        # Add the created task to the list
        created_tasks.append(task)
      except ValueError as e:
        # Collect errors for invalid tasks
        errors.append(f"Task {index + 1}: {str(e)}")

    # If any tasks failed to process it returns the list of errors
    if errors:
      return jsonify({"error": "Invalid schedule", "details": errors}), 400

    # If all tasks are processed successfully, it returns a success message and the list of created tasks
    return jsonify({
      "message": "Schedule uploaded successfully!",
      "tasks": created_tasks
    }), 201
  except json.JSONDecodeError:
    # Return an error if the JSON data is invalid
    return jsonify({"error": "Invalid JSON format"}), 400
  except Exception as e:
    # Return an internal server error if an unexpected error occurs
    return jsonify({"error": "Internal server error", "details": str(e)}), 500


# Runs the Flask app in debug mode
if __name__ == '__main__':
  app.run(debug=True)
