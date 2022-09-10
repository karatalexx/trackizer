import {getDayName} from './getDayName';

export const arrOfDays = (days: number, currentMonth: number) => {
  const result = [];
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentLocalMonth = date.getMonth();
  const currentLocalDay = date.getDate();

  if (currentLocalMonth === currentMonth) {
    for(let i = currentLocalDay; i <= days; i++) {
      result.push({number: i, day: getDayName(currentYear, currentMonth, i)})
    }
    return result;
  }
  for(let i = 1; i <= days; i++) {
    result.push({number: i, day: getDayName(currentYear, currentMonth, i)})
  }
  return result;
};