class Task():
    def __init__(self, name: str, taskType: str, date: str, startTime: str, duration: int):
        self._name = name
        self._taskType = taskType
        self._date = date
        self._startTime = startTime
        self._duration = duration
    
    # Getter and Setter for name
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value: str):
        self._name = value

    # Getter and Setter for taskType
    @property
    def taskType(self):
        return self._taskType

    @taskType.setter
    def taskType(self, value: str):
        self._taskType = value

    # Getter and Setter for date
    @property
    def date(self):
        return self._date

    @date.setter
    def date(self, value: str):
        self._date = value

    # Getter and Setter for startTime
    @property
    def startTime(self):
        return self._startTime

    @startTime.setter
    def startTime(self, value: str):
        self._startTime = value

    # Getter and Setter for duration
    @property
    def duration(self):
        return self._duration

    @duration.setter
    def duration(self, value: int):
        self._duration = value