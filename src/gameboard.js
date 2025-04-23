import { Node } from "./node.js"

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
    placeShip(ship) {
        const shipCords = ship.coordinates;
        this.board[shipCords[0]][shipCords[1]].value = "full";
    }
}
