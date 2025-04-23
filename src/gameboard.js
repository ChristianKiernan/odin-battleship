import { Node } from "./node.js";

export class Gameboard {
    constructor() {
        this.rows = 10;
        this.columns = 10;
        this.board = [];
    }
    setBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                let node = new Node("empty");
                this.board[i][j] = node;
            }
        }
    }
    placeShip(ship, initialCords, direction) {
        const shipLength = ship.length;
        const x = initialCords[0];
        const y = initialCords[1];

        if (this.directionIsValid(shipLength, x, y, direction)) {
            if (direction === "down") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x][y + i].value = "full";
                }
            } else if (direction === "right") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x + i][y].value = "full";
                }
            } else if (direction === "left") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x - i][y].value = "full";
                }
            } else if (direction === "up") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x][y - i].value = "full";
                }
            }
        }
    }
    directionIsValid(shipLength, xcord, ycord, direction) {
        if (direction === "up") {
            if (ycord - shipLength < -1) {
                return false;
            } else {
                return true;
            }
        } else if (direction === "down") {
            if (ycord + shipLength > 10) {
                return false;
            } else {
                return true;
            }
        } else if (direction === "left") {
            if (xcord - shipLength < -1) {
                return false;
            } else {
                return true;
            }
        } else if (direction === "right") {
            if (xcord + shipLength > 10) {
                return false;
            } else {
                return true;
            }
        }
    }
}
