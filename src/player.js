import { Gameboard } from "./gameboard";

export class Player {
    constructor(mode, name) {
        this.mode = mode;
        this.name = name;
        this.board = new Gameboard();
        this.guessList = [];
        this.possibleList = [];
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
    setPossibleList() {
        if (this.possibleList.length === 0) {
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([0, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([1, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([2, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([3, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([4, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([5, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([6, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([7, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([8, i]);
            }
            for (let i = 0; i < 10; i++) {
                this.possibleList.push([9, i]);
            }
        }
    }
    removeFromPossibleList(possibleList, xTarget, yTarget) {
        let newList = possibleList.filter(
            ([x, y]) => !(x === xTarget && y === yTarget)
        );
        this.possibleList = newList;
        return this.possibleList;
    }
    getPossibleList() {
        return this.possibleList;
    }
}
