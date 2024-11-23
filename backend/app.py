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
  
  # Extracts the task type, title, description, and frequency (if available) from the JSON data
  task_type = data.get("type")
  title = data.get("title")
  description = data.get("description")
  frequency = data.get("frequency", None)  # Optional for recurring tasks

  # Trys to create a new task with the given data
  try:
    task = controller.create_task(task_type, title, description, frequency)
    # Returns the newly created task as a JSON response
    return jsonify(task.to_dict()), 201
  except ValueError as e:
    return jsonify({"error": str(e)}), 400

# Defines an endpoint at /tasks/<task_id> for any DELETE requests by its task_id
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
  # Task_id is captured from the URL and passed to the delete_task method in the controller
  controller.delete_task(task_id)
  return jsonify({"message": "Task deleted"}), 200

# Runs the Flask app in debug mode
if __name__ == '__main__':
  app.run(debug=True)
