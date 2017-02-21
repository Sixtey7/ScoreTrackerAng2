interface Scoreable {
    name: String;
    calculateScore(value: number): number;
    getScore(): number;
    getCurrNum(): number;
}

export default Scoreable;