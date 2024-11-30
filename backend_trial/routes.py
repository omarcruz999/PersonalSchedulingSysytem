from app import app,db
from flask import request, jsonify
from Task import task

#get all tasks
@app.route("/api/tasks", methods=["GET"]) # GET means it is going to access all the data in the data base and retunr
def get_tasks():
    #return all tasks in database "SELECT * FROM tasks " THIS is basically whats running in python 
    tasks = tasks.query.all()
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
    required_fields = ["name","role","description","gender"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    role = data.get("role")
    description = data.get("description")
    gender = data.get("gender")

    # Fetch avatar image based on gender
    if gender == "male":
      img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "female":
      img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
      img_url = None

    new_tasks = task(name=name, role=role, description=description, gender= gender, img_url=img_url)
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
@app.route("/api/tasks/<int:id>",methods=["DELETE"])
def delete_tasks(id):
  try:
    tasks = tasks.query.get(id)
    if tasks is None:
      return jsonify({"error":"tasks is not found"}),404
    
    db.session.delete(tasks)
    db.session.commit()
    return jsonify({"msg":"tasks is deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500