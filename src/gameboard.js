import { Node } from "./node.js"

export class Gameboard {
    constructor() {
        this.rows = 10;
        this.columns = 10;
        this.board = [];
    }
    setBoard() {
        for (let row = 0; row < this.rows; row++) {
            board[i] = [];
            for (let col = 0; col < this.columns; col++) {
                let node = new Node();
                board[i].push(node);
            }
        }
    }
}

