from task import Task
from app import db

class TransientTask(Task,db.Model):
    end_date = db.Column(db.String(11), nullable = False)

    def to_json(self):
        json_data = super().to_json()
        json_data.update({
            "end_date":self.end_date
        })
        return json_data