import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

class Controller {
    constructor() {
        this.playerOne = new Player("real");
        this.playerTwo = new Player("computer");
        this.players = [playerOne, playerTwo];
        this.activePlayer = players[0];
    }
    setUpOne() {
        playerOne.board.setBoard();
        playerOne.board.placeShip("submarine", [0, 1], "down");
        playerOne.board.placeShip("cruiser", [0, 9], "right");
        playerOne.board.placeShip("battleship", [5, 5], "up");
        playerOne.board.placeShip("carrier", [9, 9], "left");
        playerOne.board.placeShip("destroyer", [8, 0], "down");
    }
    setUpTwo() {
        playerTwo.board.setBoard();
        playerTwo.board.placeShip("submarine", [0, 1], "down");
        playerTwo.board.placeShip("cruiser", [0, 9], "right");
        playerTwo.board.placeShip("battleship", [4, 4], "up");
        playerTwo.board.placeShip("carrier", [9, 9], "left");
        playerTwo.board.placeShip("destroyer", [8, 0], "down");
    }
    getActivePlayer() {
        return this.activePlayer;
    }
    switchTurns() {
        this.activePlayer =
            this.activePlayer === players[0] ? players[1] : players[0];
    }
    setGameMessage() {
        if (this.activePlayer === "PlayerOne") {
            return "Click a square to attack, human";
        } else {
            return "My turn :)";
        }
    }
    playRound() {
        setGameMessage();
    }
}
