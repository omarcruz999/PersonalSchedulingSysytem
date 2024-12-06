from task import Task

class RecurringTask(Task):
    frequency = db.Column(db.Integer(),nullable = True)

    json_data = super().to_json()
    json_data.update({
        "frequency":self.frequency
    })
    return json_data