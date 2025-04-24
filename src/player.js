import { Gameboard } from "./gameboard";

export class Player {
    constructor(mode) {
        this.mode = mode;
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
    getGuessList() {
        return this.guessList;
    }
}