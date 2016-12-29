interface Scoreable {
    name: String;
    calculateScore(value: number): number;
    getScore(): number;
}

export default Scoreable;