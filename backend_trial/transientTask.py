from task import Task
from app import db

class TransientTask(Task):
    
    end_date = db.Column(db.String(11), nullable = False)
    id = db.Column(None,db.ForeignKey(Task.id),primary_key = True)

    # Polymorphic identity is what identifies what differentianes between all classes called the discrimnator column
    __mapper_args__ = {
        "polymorphic_identity": "transient",
        
    }

    def to_json(self):
        json_data = super().to_json()
        json_data.update({
            "end_date":self.end_date
        })
        return json_data