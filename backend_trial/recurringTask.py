from task import Task
from app import db
class RecurringTask(Task,db.Model):
    #1 (daily) , 7(weekly)

    '''
    For a recurring task, the End Date does not have to be a date in which the
    task would recur. For example, if this is a weekly recurring task with a start
    date of 20200110 (January 10th), it could have an End Date of 20200505
    (May 5th), even though the task would not normally be on that date.
    '''
    #MAKESURE TO USE TIME DELTA FOR INTERBALS FOR RECURRING TASK TO BE ABLE TO REDO IT 
    frequency = db.Column(db.Integer(),nullable = True)
    end_date = db.Column(db.Integer(),nullable = True)
    id = db.Column(None,db.ForeignKey(Task.id),primary_key = True)

    __mapper_args__ = {
        "polymorphic_identity": "Recurring",
        
    }
    def to_json(self):
        json_data = super().to_json()
        json_data.update({
            "frequency":self.frequency,
            "end_date":self.end_date
        })
        return json_data