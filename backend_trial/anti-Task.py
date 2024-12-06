from task import Task

class Anti-Task(Task):
    end_date = db.Column(db.String(11), nullable = True)

    json_data = super().to_json()
    json_data.update({
        "end_date":self.end_date
    })

    return json_data