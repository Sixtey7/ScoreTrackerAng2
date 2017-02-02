export default class ServerPlayerResult {
    public playerId: string | number;
    public score: number;

    constructor(_playerId: string | number, _score : number) {
        this.playerId = _playerId;
        this.score = _score;
    }
}