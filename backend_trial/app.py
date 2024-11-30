from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#pass so it can do stuff for relative pass
app = Flask(__name__)

CORS(app)

#creating a database locally                        name goes here of the db
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friend.db"

#performance reason so we dont consume resources 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#create our db instance and passing our app
db = SQLAlchemy(app)

import routes
# note when we running the app make sure to set it to the main.py file or app.py since that were its going to start
#set flask_env - dev is jsut for debugging
with app.app_context():
    db.create_all()

#check if the script is being run directyl so when imported it wont run this line only directly
if __name__ == "__main__":
    app.run(debug = True,host='0.0.0.0')