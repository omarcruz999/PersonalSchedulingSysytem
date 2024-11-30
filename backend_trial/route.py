from app import app,db
from flask import request, jsonify
from task import Task



#get all tasks
@app.route("/api/tasks", methods=["GET"]) # GET means it is going to access all the data in the data base and retunr
def get_tasks():
    #return all tasks in database "SELECT * FROM tasks " THIS is basically whats running in python 
    tasks = Task.query.all()
    #convert to json to return to client 
    result = [tasks.to_json() for tasks in tasks]
    # basciallty putting it in json format  [{...}, {...}]
    return jsonify(result)

@app.route("/api/tasks",methods=["POST"])
def create_tasks():
  try:
    #take the request and convert to json
    data = request.json

    # Validations
    required_fields = ["name","type","description","start_time", "start_date", "duration"]
    for field in required_fields:
      #if a field is empty it will display an error
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    type = data.get("role")
    description = data.get("description")
    start_time = data.get("start_time")
    start_date = data.get("start_date")
    duration = data.get("duartion")

    # Fetch avatar image based on gender
    #Leave this for reference
    if gender == "male":
      img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "female":
      img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
      img_url = None

#creating the task with all intial inputs 
    new_tasks = Task(name=name, type=type, description=description, start_time= start_time, start_date=start_date, duration = duration)
#like git add.
    db.session.add(new_tasks) 
    #like git commit
    db.session.commit()
#some resource is being created 
    return jsonify({"message":"freiend created"}), 201
    
  except Exception as e:
    #rollback to previus state
    db.session.rollback()
    #convert the error to string 
    return jsonify({"error":str(e)}), 500
  
#Delete tasks
# might have to delete task by name 
@app.route("/api/tasks/name",methods=["DELETE"])
def delete_tasks(name):
  try:
    #look for name 
    tasks = Task.query.get(name)
    if tasks is None:
      return jsonify({"error":"tasks is not found"}),404
    
    db.session.delete(tasks)
    db.session.commit()
    return jsonify({"msg":"tasks is deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
# Update a task
@app.route("/api/friends/name",methods=["PATCH"])
def update_friend(name):
  try:
    task = Task.query.get(name)
    if task is None:
      return jsonify({"error":"Friend not found"}), 404
    
    data = request.json

    task.name = data.get("name",task.name)
    task.role = data.get("role",task.role)
    task.description = data.get("description",task.description)
    task.gender = data.get("gender",task.gender)

    db.session.commit()
    return jsonify(task.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500