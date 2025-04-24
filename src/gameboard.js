import { Node } from "./node.js";
import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.rows = 10;
        this.columns = 10;
        this.board = [];
        this.guessList = [];
        this.hitList = [];

        this.destroyer = new Ship("destroyer", 2);
        this.submarine = new Ship("submarine", 3);
        this.cruiser = new Ship("cruiser", 3);
        this.battleship = new Ship("battleship", 4);
        this.carrier = new Ship("carrier", 5);
    }
    setBoard() {
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.columns; j++) {
                row.push(new Node());
            }
            this.board.push(row);
        }
    }
    placeShip(ship, initialCords, direction) {
        const shipLength = ship.length;
        const shipId = ship.id;
        const x = initialCords[0];
        const y = initialCords[1];

        if (this.directionIsValid(shipLength, x, y, direction)) {
            if (direction === "down") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x][y + i].value = `${shipId}`;
                }
            } else if (direction === "right") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x + i][y].value = `${shipId}`;
                }
            } else if (direction === "left") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x - i][y].value = `${shipId}`;
                }
            } else if (direction === "up") {
                for (let i = 0; i < shipLength; i++) {
                    this.board[x][y - i].value = `${shipId}`;
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
    receiveAttack(cords) {
        if (!this.guessList.includes(cords)) {
            const x = cords[0];
            const y = cords[1];

            if (this.board[x][y].value === "empty") {
                this.setGuessList(cords);
                return "Miss!";
            } else {
                this.setHitList(cords);
                this.sendHit(this.board[x][y].value);
                return `Hit on ${this.board[x][y].value}`;
            }
        }
        return "Invalid guess";
    }
    setGuessList(cords) {
        this.guessList.push(cords);
    }
    getGuessList() {
        return this.guessList;
    }
    setHitList(cords) {
        this.hitList.push(cords);
    }
    getHitList() {
        return this.hitList;
    }
    resetGuessList() {
        this.guessList = [];
    }
    sendHit(idOfShip) {
        if (idOfShip === "destroyer") {
            this.destroyer.hit();
        } else if (idOfShip === "submarine") {
            this.submarine.hit();
        } else if (idOfShip === "cruiser") {
            this.cruiser.hit();
        } else if (idOfShip === "battleship") {
            this.battleship.hit();
        } else if (idOfShip === "carrier") {
            this.carrier.hit();
        }
    }
    gameOver() {
        if (
            this.destroyer.isSunk() &&
            this.submarine.isSunk() &&
            this.cruiser.isSunk() &&
            this.battleship.isSunk() &&
            this.carrier.isSunk()
        ) {
            return true;
        }
        return false;
    }
    getDestroyerObj() {
        return this.destroyer;
    }
    getSubmarineObj() {
        return this.submarine;
    }
    getCruiserObj() {
        return this.cruiser;
    }
    getBattleShipObj() {
        return this.battleship;
    }
    getCarrierObj() {
        return this.carrier;
    }
}
