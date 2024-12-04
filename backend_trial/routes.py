from app import app,db
from flask import request, jsonify
from task import Task
from datetime import date
from sqlalchemy.sql import func

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
    required_fields = ["name","type","description", "duration","start_time","start_date"]
    for field in required_fields:
      #if a field is empty it will display an error
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    type = data.get("type")
    description = data.get("description")
    start_time = data.get("start_time")
    start_date = str(date.today())
    duration = data.get("duartion")

   
    #creating the task with all intial inputs 
    #this allows us to create our task based on the task that is happening
    #Leave this for reference
    '''
    if type == "recurring":
      new_tasks = Task(name=name, type="recurring", description=description, start_time= start_time, start_date=start_date, duration = duration)
    elif type == "transient":
      new_tasks = Task(name=name, type="transient", description=description, start_time= start_time, start_date=start_date, duration = duration)
    elif type == "anti-task":
      new_tasks = Task(name=name, type="anti-task", description=description, start_time= start_time, start_date=start_date, duration = duration)
    else:
      new_tasks = Task(name=name, type=type, description=description, start_time= start_time, start_date=start_date, duration = duration)
      
'''

    new_tasks = Task(name=name, type=type, description=description, start_time=start_time, start_date=start_date, duration = duration)
#like git add.
    db.session.add(new_tasks) 
    #like git commit
    db.session.commit()
#some resource is being created 
    return jsonify({"message":"Task created"}), 201
    
  except Exception as e:
    #rollback to previus state
    db.session.rollback()
    #convert the error to string 
    return jsonify({"error":str(e)}), 500
  
#Delete tasks
# might have to delete task by name 
#<string:name> is to specifically get that primary key in our task which is the name of the task 
@app.route("/api/tasks/<string:name>",methods=["DELETE"])
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
#This allows us to get the name of task and return all the data and we can update to what we want 
@app.route("/api/friends/<string:name>",methods=["PATCH"])
def update_friend(name):
  try:
    task = Task.query.get(name)
    if task is None:
      return jsonify({"error":"Friend not found"}), 404
    
    data = request.json

    task.name = data.get("name",task.name)
    task.type = data.get("type",task.type)
    task.description = data.get("description",task.description)
    task.start_time = data.get("start_time",task.start_time)
    task.start_date = data.get("start_date",task.start_date)
    task.duration = data.get("duration",task.duration)



    db.session.commit()
    return jsonify(task.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500