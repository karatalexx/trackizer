export const getDays = (month: number, year: number) => new Date(year, month+1, 0).getDate();
