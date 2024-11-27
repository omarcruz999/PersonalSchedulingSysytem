from flask import Flask, request, jsonify
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

  # Extracts the optional attributes
  frequency = data.get("frequency")  # For recurring tasks
  end_date = data.get("end_date")    # For recurring tasks
  cancelled_task_id = data.get("cancelled_task_id")  # For anti-tasks

  # Trys to create a new task with the given data
  try:
    task = controller.create_task(
      task_type, 
      title, 
      description,
      start_time,
      duration,
      start_date, 
      frequency,
      end_date,
      cancelled_task_id,
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

# Runs the Flask app in debug mode
if __name__ == '__main__':
  app.run(debug=True)
