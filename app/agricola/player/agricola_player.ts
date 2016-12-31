export default class AgricolaPlayer {
    public name: string;
    public score: number;

    constructor(name: string, score?: number) {
        this.name = name;

        if (score) {
            this.score = score
        }
        else {
            this.score = 0;
        }
    }
}