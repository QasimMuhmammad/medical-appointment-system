
class Time {
  constructor(hour, minute)
  {
    // store time in minutes for easy conversion
    this.time = hour * 60 + minute;
  }

  addTime(minute)
  {
    this.time += minute;
  }

  get getTime()
  {
    var toReturn;
    toReturn.hour = getHour();
    toReturn.minute = getMinute();
    return toReturn;
  }

  get getHour()
  {
    return this.time / 60;
  }

  get getMinute()
  {
    return this.time % 60;
  }
};
