import Task

class RecurringTask(Task):
    def __init__(self,  name: str, taskType: str, date: str, startTime: str, duration: int, endDate: str, frequency: int):
        super().__init__(name, taskType, date, startTime, duration)
        self._endDate = endDate
        self._frequency = frequency

    # Getter and Setter for endDate
    @property
    def endDate(self):
        return self._endDate

    @endDate.setter
    def name(self, value: str):
        self._endDate = value
    
    # Getter and Setter for frequency
    @property
    def endDate(self):
        return self._frequency

    @frequency.setter
    def name(self, value: str):
        self._frequency = value