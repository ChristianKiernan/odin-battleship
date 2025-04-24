import { Gameboard } from "./gameboard";

export class Player {
    constructor(type) {
        this.type = type;
        this.board = new Gameboard();
        this.guessList = [];
    }
    setGuessList(cords, type) {
        const guess = {
            Cords: cords,
            Type: type
        }
        this.guessList.push(guess);
    }
}