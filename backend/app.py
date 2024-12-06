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


@app.route('/upload-schedule', methods=['POST'])
def upload_schedule():
  if 'file' not in request.files:
    return jsonify({'error': 'No file part'}), 400
  
  file = request.files['file']
  
  try:
    # Parse and validate JSON
    schedule_data = json.load(file)
    # Validate schedule (example: check for task overlaps or invalid data)
    errors = validate_schedule(schedule_data)
    
    if errors:
      return jsonify({'error': 'Invalid schedule', 'details': errors}), 400
    
    return jsonify({'message': 'Schedule uploaded successfully'})
  except json.JSONDecodeError:
    return jsonify({'error': 'Invalid JSON'}), 400
  
def validate_schedule(schedule_data):
  errors = []
  for task in schedule_data.get('tasks', []):
    if 'start time' not in task or 'end_time' not in task:
      errors.append(f"Task {task} missing start_time or end_time")
  return errors

# Runs the Flask app in debug mode
if __name__ == '__main__':
  app.run(debug=True)
