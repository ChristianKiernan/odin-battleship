import "./styles.css";
import { Player } from "./player";

export class Controller {
    constructor() {
        this.playerOne = new Player("real");
        this.playerTwo = new Player("computer");
        this.players = [this.playerOne, this.playerTwo];
        this.activePlayer = this.players[0];
        this.gameOver = false;
        this.winner = null;
        this.guessList = [];
        this.hitList = [];
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
            this.activePlayer === this.players[0]
                ? this.players[1]
                : this.players[0];
    }
    setRoundMessage() {
        if (this.activePlayer === "PlayerOne") {
            return "Click a square to attack, human";
        } else {
            return "My turn :)";
        }
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
}
//     playRound(coordinates) {
//         let defender = this.players[1];
//         if (this.activePlayer === this.players[1]) {
//             defender = this.players[0];
//         }
//         if (defender.board.receiveAttack(coordinates) !== "Miss!") {
//             this.activePlayer.board.setHitList(coordinates);
//         }
//         if (defender.board.gameOver) {
//             this.gameOver = true;
//             this.winner = this.activePlayer;
//             this.gameOverMessage();
//         }
//         this.activePlayer.board.setGuessList(coordinates);
//         //this.switchTurns();
//     }
//     gameOverMessage() {
//         return `Game Over! ${this.winner} wins!`;
//     }
//     getWinner() {
//         return this.winner;
//     }
// }
