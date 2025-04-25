import { Gameboard } from "./gameboard";

export class Player {
    constructor(mode, name) {
        this.mode = mode;
        this.name = name;
        this.board = new Gameboard();
        this.guessList = [];
    }
    setGuessList(cords, type) {
        const xcord = cords[0];
        const ycord = cords[1];
        const newxCord = String.fromCharCode(65 + xcord);
        let coordsArr = [];
        coordsArr.push(newxCord, ycord);
        const guess = {
            Coords: coordsArr,
            Type: type,
        };
        this.guessList.push(guess);
    }
    getGuessList() {
        return this.guessList;
    }
}
