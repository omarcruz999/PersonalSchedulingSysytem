from app import app,db
from flask import request, jsonify
from task import Task
from datetime import date
from antiTask import AntiTask
from recurringTask import RecurringTask
from transientTask import TransientTask
#from sqlalchemy.sql import func

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
#add ID to get specific
#specific date to cancel for anti-task and transiet
    id = data.get("id")
    name = data.get("name")
    type = data.get("type")
    description = data.get("description")
    start_time = data.get("start_time")
    start_date = str(date.today())
    duration = data.get("duartion")
    end_date = data.get("end_date")
    frequency = data.get("frequency")
    cancel_date = data.get("cancel_date")
    #creating the task with all intial inputs 
    #this allows us to create our task based on the task that is happening
    #Leave this for reference
    
    if type == "recurring":
      # Validations
    #Required is only for inputs for basic identification of a task
    #add ID to have recurring task but with different ids toa llow adding of same tasks
      required_fields = ["name","type","description" ,"start_time","start_date", "duration","frequency"]
      for field in required_fields:
      #if a field is empty it will display an error
        if field not in data or not data.get(field):
          return jsonify({"error":f'Missing required field: {field}'}), 400
      new_tasks = RecurringTask(name=name, type="recurring", description=description, start_time= start_time, start_date=start_date, duration = duration, frequency = frequency, end_date=end_date)

    elif type == "transient":
      # Validations
    #Required is only for inputs for basic identification of a task
    #add ID to have recurring task but with different ids toa llow adding of same tasks
      required_fields = ["name","type","description" ,"start_time","start_date", "duration"]
      for field in required_fields:
      #if a field is empty it will display an error
        if field not in data or not data.get(field):
          return jsonify({"error":f'Missing required field: {field}'}), 400
      new_tasks = TransientTask(name=name, type="transient", description=description, start_time= start_time, start_date=start_date, duration = duration,end_date = end_date)


    elif type == "anti-task":
      # Validations
    #Required is only for inputs for basic identification of a task
    #add ID to have recurring task but with different ids toa llow adding of same tasks
      required_fields = ["name","type","description" ,"start_time","start_date", "duration"]
      for field in required_fields:
        #if a field is empty it will display an error
        if field not in data or not data.get(field):
          return jsonify({"error":f'Missing required field: {field}'}), 400
      new_tasks = AntiTask(name=name, type="anti-task", description=description, start_time= start_time, start_date=start_date, duration = duration, cancel_date = cancel_date)


    else:
      return jsonify({"error":"No type was entered"}), 500
    
    #like git add.
    db.session.add(new_tasks) 
    #like git commit
    db.session.commit()
    #some resource is being created 
    return jsonify({"message":"Task created", "type":type }), 201
    
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

# Get a specific task
@app.route("/user/<int:id>")
def user_detail(id):
    user = User.query.get_or_404(id)
    return {
        "name": Task.name,
        "type": Task.type,
        "description": User.descritption,
      
    }


#This only access one table which should be helpful in terms of what type of tasks we should see
# @app.route("/api/tasks/<string:name>",methods=["GET"])
# def delete_tasks(name):
#   try:
#     #look for name 
#     tasks = name.query.all()
#     result = [tasks.to_json() for tasks in tasks]
#     # basciallty putting it in json format  [{...}, {...}]
#     return jsonify(result)