import "./styles.css";
import { Player } from "./player";

export class Controller {
    constructor() {
        this.playerOne = new Player("real", "Player One");
        this.playerTwo = new Player("computer", "Player Two");
        this.activePlayer = this.playerOne;
        this.gameOver = false;
        this.winner = null;
    }
    setUpOne() {
        this.playerOne.board.setBoard();
        this.playerOne.board.placeShip(
            this.playerOne.board.getSubmarineObj(),
            [0, 1],
            "down"
        );
        this.playerOne.board.placeShip(
            this.playerOne.board.getCruiserObj(),
            [0, 9],
            "right"
        );
        this.playerOne.board.placeShip(
            this.playerOne.board.getBattleShipObj(),
            [5, 5],
            "up"
        );
        this.playerOne.board.placeShip(
            this.playerOne.board.getCarrierObj(),
            [9, 9],
            "left"
        );
        this.playerOne.board.placeShip(
            this.playerOne.board.getDestroyerObj(),
            [8, 0],
            "down"
        );
    }
    setUpTwo() {
        this.playerTwo.board.setBoard();
        this.playerTwo.board.placeShip(
            this.playerTwo.board.getSubmarineObj(),
            [0, 1],
            "down"
        );
        this.playerTwo.board.placeShip(
            this.playerTwo.board.getCruiserObj(),
            [0, 9],
            "right"
        );
        this.playerTwo.board.placeShip(
            this.playerTwo.board.getBattleShipObj(),
            [4, 4],
            "up"
        );
        this.playerTwo.board.placeShip(
            this.playerTwo.board.getCarrierObj(),
            [9, 9],
            "left"
        );
        this.playerTwo.board.placeShip(
            this.playerTwo.board.getDestroyerObj(),
            [8, 0],
            "down"
        );
    }
    getActivePlayer() {
        return this.activePlayer;
    }
    switchTurns() {
        this.activePlayer =
            this.activePlayer === this.playerOne
                ? this.playerTwo
                : this.playerOne;
    }
    setRoundMessage() {
        if (this.activePlayer === "PlayerOne") {
            return "Click a square to attack, human";
        } else {
            return "My turn :)";
        }
    }
}

