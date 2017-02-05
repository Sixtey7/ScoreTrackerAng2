export default class Player {
    public id: string;
    public name: string;
    public score: number;

    constructor(id: string, name: string, score?: number) {
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