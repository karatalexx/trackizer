export const getMonthNames = (month: number, year: number) => {
  const date = new Date(year, month);
  const result = [];
  for (let i=0; i<12; i++) {
    result.push(date.toLocaleString('default',{month:'long'}));
    date.setMonth(date.getMonth() + 1);
  }
  return result;
};
