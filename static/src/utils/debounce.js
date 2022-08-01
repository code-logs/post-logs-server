export const debounce = (callback, timingMillieSeconds = 300) => {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, timingMillieSeconds);
    };
};
//# sourceMappingURL=debounce.js.map