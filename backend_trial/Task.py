from app import db
from datetime import datetime
#from sqlalchemy.sql import func


#Superclass
class Task(db.Model):
    # we need from the task its name task type , date, start time , duration 
   

    # True makes it option False makes it mandatory
    id = db.Column(db.Integer(),primary_key=True)
    name = db.Column(db.String(100), nullable = False)
    type = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text, nullable =False)
    #dates need to be formatted in the YYYYMMDD
    '''
    The month value must range from 01 to 12, and the day must
    range from 01 through the number of days in that month (for that year)
    '''
    start_date = db.Column(db.String(11), nullable = False)
    #test changed to Treu
    start_time = db.Column(db.String(10),nullable=True)
    #an option since we have transient task and anti task 
    duration = db.Column(db.Integer,nullable = True)

    __mapper_args__ = {
        "polymorphic_identity": "Task",
        "polymorphic_on": "type",
    }

    def to_json(self):
        return {
            "id": self.id,
            "name":self.name,
            "type" : self.type,
            "description": self.description,
            "start_date": self.start_date,
            "start_time": self.start_time,
            "duration" :self.duration,
        }