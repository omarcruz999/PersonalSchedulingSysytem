from app import db
import datetime

#Superclass
class Task(db.Model):
    # we need from the task its name task type , date, start time , duration 

    
    name = db.Column(db.String(100), primary_key = True)
    type = db.Column(db.String(50), nullable = False)
    description = db.Column(db.Text, nullable =False)
    start_date = db.Column(db.String(10), nullable = False)
    start_time = db.Column( db.String(10), nullable = True)
    duration = db.column(db.DateTime,default = datetime.datetime.now)