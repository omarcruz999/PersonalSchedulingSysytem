from task import Task
from app import db

class AntiTask(Task):
    cancel_date = db.Column(db.String(11), nullable = True)
    id = db.Column(None,db.ForeignKey(Task.id),primary_key = True)

    __mapper_args__ = {
        "polymorphic_identity": "AntiTask",
        
    }
    def to_json(self):
        json_data = super().to_json()
        json_data.update({
            "cancel_date":self.cancel_date
        })

        return json_data