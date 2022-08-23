export const getDayName = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};
