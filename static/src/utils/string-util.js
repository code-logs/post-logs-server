class StringUtil {
    static splitByIndex(text, index) {
        const front = text.slice(0, index);
        const rear = text.slice(index);
        return [front, rear];
    }
}
export default StringUtil;
//# sourceMappingURL=string-util.js.map