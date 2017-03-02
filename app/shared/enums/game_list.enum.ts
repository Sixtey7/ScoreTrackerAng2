enum GameList {
    AGRICOLA,
    CARCASSONNE,
    LORDS_OF_WATERDEEP,
    CASTLES_OF_BURGANDY
}

namespace GameList {
    export function fromReadableString(_readable: string): GameList {
        switch (_readable.toUpperCase()) {
            case "AGRICOLA":
                return GameList.AGRICOLA;
            case "CARCASSONNE":
                return GameList.CARCASSONNE;
            case "LORDS OF WATERDEEP":
                return GameList.LORDS_OF_WATERDEEP;
            case "CASTLES OF BURGANDY":
                return GameList.CASTLES_OF_BURGANDY;
            default:
                return null;
        }
    }

    export function toReadableString(_gameList: GameList): string {
        console.log('got the gamelist: ' + _gameList);
        switch(_gameList) {
            case GameList.AGRICOLA:
                return "AGRICOLA";
            case GameList.CARCASSONNE:
                return "CARCASSONNE";
            case GameList.LORDS_OF_WATERDEEP:
                return "LORDS OF WATERDEEP";
            case GameList.CASTLES_OF_BURGANDY:
                return "CASTLES OF BURGANDY";
            default:
                return "UNDEFINED";
        }
    }

    export function allStrings(): string[] {
        let returnString: string[] = new Array<string>();

        returnString.push(GameList.toReadableString(GameList.AGRICOLA));
        returnString.push(GameList.toReadableString(GameList.CARCASSONNE));
        returnString.push(GameList.toReadableString(GameList.LORDS_OF_WATERDEEP));
        returnString.push(GameList.toReadableString(GameList.CASTLES_OF_BURGANDY));


        return returnString;
    }
};

export {
    GameList
};