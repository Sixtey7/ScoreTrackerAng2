export default class AgricolaPlayer {
    public id: String;
    public name: String;
    public score: number;

    constructor(id: String, name: String, score?: number) {
        this.name = name;
        this.id = id;

        if (score) {
            this.score = score
        }
        else {
            this.score = 0;
        }
    }
}