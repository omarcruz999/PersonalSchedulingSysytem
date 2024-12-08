from task import Task
from app import db
class RecurringTask(Task,db.Model):
    frequency = db.Column(db.Integer(),nullable = True)

    def to_json(self):
        json_data = super().to_json()
        json_data.update({
            "frequency":self.frequency
        })
        return json_data