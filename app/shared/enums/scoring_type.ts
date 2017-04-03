enum ScoringType {
    AGRICOLA,
    PLAYER_SCORE
}

namespace ScoringType {
    export function fromReadableString(_readable: string) : ScoringType {
        switch (_readable.toUpperCase()) {
            case "AGRICOLA":
                return ScoringType.AGRICOLA;
            default:
                return ScoringType.PLAYER_SCORE;
        }
    }

    export function toReadableString(_scoringType: ScoringType): string {
        switch(_scoringType) {
            case ScoringType.AGRICOLA:
                return 'AGRICOLA';
            default:
                return 'STANDARD';
        }
    }

    export function allStrings(): string[] {
        let returnString: string[] = new Array<string>();

        returnString.push(ScoringType.toReadableString(ScoringType.AGRICOLA));
        returnString.push(ScoringType.toReadableString(ScoringType.PLAYER_SCORE));

        return returnString;
    }
};

export { 
    ScoringType
};