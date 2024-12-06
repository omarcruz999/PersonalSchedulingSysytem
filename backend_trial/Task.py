from app import db
from datetime import datetime
#from sqlalchemy.sql import func


#Superclass
class Task(db.Model):
    # we need from the task its name task type , date, start time , duration 

    # True makes it option False makes it mandatory

    name = db.Column(db.String(100), primary_key = True)
    type = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text, nullable =False)
    start_date = db.Column(db.String(11), nullable = False)
    start_time = db.Column(db.String(10),nullable=False)
    #an option since we have transient task and anti task 
    duration = db.Column(db.Integer,nullable = True)

    def to_json(self):
        return {
            "name":self.name,
            "type" : self.type,
            "description": self.description,
            "start_date": self.start_date,
            "start_time": self.start_time,
            "duration" :self.duration,
        }