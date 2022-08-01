export const toLocalizedDatetimeInputValue = (timestamp) => {
    const timezoneOffset = new Date().getTimezoneOffset();
    return new Date(timestamp - timezoneOffset * 60 * 1000)
        .toISOString()
        .split('.')[0];
};
export const toLocalizedDateInputValue = (timestamp) => {
    const timezoneOffset = new Date().getTimezoneOffset();
    return new Date(timestamp - timezoneOffset * 60 * 1000)
        .toISOString()
        .slice(0, 10);
};
//# sourceMappingURL=date-util.js.map