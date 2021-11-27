import { WorkHoursMultiple } from "./models/WorkHours";

export interface AvailabilityModel {
    [key: number]: AvailabilityDay // Entry per Day: 1-Monday 7-Sunday
}

export interface AvailabilityDay {
    [key: number]: boolean; // Entry per Hour - 24HoursFormat
}

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const daysN = [1, 2, 3, 4, 5, 6, 7];
export const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
export const hoursN = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
export const defaultAvailability = () => {
  const dayDict = {} as AvailabilityModel;
  for(const day of daysN){
    dayDict[day] = defaultAvailabilityDay();
  }
  return dayDict;
}

export const defaultAvailabilityDay = () => {
  const day = {} as AvailabilityDay;
  for(const hour of hoursN) {
    day[hour] = false;
  }
  return day;
}

export const toWorkHours = (av: AvailabilityModel, user_id: number) => {
  const result = { data: [] }  as WorkHoursMultiple;
  for(const day of daysN){
    const dayDict = av[day];
    let flag = false;
    let flagStart = -1;
    let flagDuration = 1;
    for(const hour of hoursN) {
      const hourDict = dayDict[hour];
      if(flag && hourDict) {
        flagDuration += 1;
      }
      if(flag && !hourDict) {
        result.data?.push({
          user_id: user_id,
          day: day,
          hour: flagStart,
          duration: flagDuration,
        });
        flag = false;
      }
      if(!flag && hourDict) {
        flag = true;
        flagStart = hour;
        flagDuration = 1;
      }
    }
    if(flag) {
      result.data?.push({
        user_id: user_id,
        day: day,
        hour: flagStart,
        duration: flagDuration,
      });
      flag = false;
    }
  }
  return result;
}

export const toWorkHoursDay = (av: AvailabilityDay, user_id: number, day: number) => {
  const result = { data: [] }  as WorkHoursMultiple;
  let flag = false;
  let flagStart = -1;
  let flagDuration = 1;
  for(const hour of hoursN) {
    const hourDict = av[hour];
    if(flag && hourDict) {
      flagDuration += 1;
    }
    if(flag && !hourDict) {
      result.data?.push({
        user_id: user_id,
        day: day,
        hour: flagStart,
        duration: flagDuration,
      });
      flag = false;
    }
    if(!flag && hourDict) {
      flag = true;
      flagStart = hour;
      flagDuration = 1;
    }
  }
  if(flag) {
    result.data?.push({
      user_id: user_id,
      day: day,
      hour: flagStart,
      duration: flagDuration,
    });
    flag = false;
  }
  return result;
}
