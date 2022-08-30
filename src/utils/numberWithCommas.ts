export const numberWithCommas = (value: number): string => {
    const fixedValue = value.toFixed(2);
    return fixedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
