import { Controller } from "./controller";

const newGame = new Controller();
newGame.setUpOne();
newGame.setUpTwo();
setDomElements(newGame);

function setDomElements(controllerObj) {
    const body = document.querySelector("body");

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    document.body.appendChild(containerDiv);

    const playerOneDiv = document.createElement("div");
    playerOneDiv.classList.add("guess-list");
    playerOneDiv.setAttribute("id", "p1-list");
    containerDiv.appendChild(playerOneDiv);

    const playerOneHead = document.createElement("h2");
    playerOneHead.innerHTML = "Coordinates Guessed:"
    playerOneDiv.appendChild(playerOneHead);

    const boardOneDiv = document.createElement("div");
    boardOneDiv.classList.add("board");
    boardOneDiv.setAttribute("id", "one");
    containerDiv.appendChild(boardOneDiv);

    const messageBoard = document.createElement("div");
    messageBoard.classList.add("message");
    messageBoard.innerHTML = "Welcome to Battleship! Place Your Ships";
    containerDiv.appendChild(messageBoard);

    const playerTwoDiv = document.createElement("div");
    playerTwoDiv.classList.add("guess-list");
    playerTwoDiv.setAttribute("id", "p2-list");
    containerDiv.appendChild(playerTwoDiv);

    const playerTwoHead = document.createElement("h2");
    playerTwoHead.innerHTML = "Coordinates Guessed:"
    playerTwoDiv.appendChild(playerTwoHead);

    const boardTwoDiv = document.createElement("div");
    boardTwoDiv.classList.add("board");
    boardTwoDiv.setAttribute("id", "two");
    containerDiv.appendChild(boardTwoDiv);

    createBoardGrid(controllerObj, boardOneDiv);
    createBoardGrid(controllerObj, boardTwoDiv);
}

function createBoardGrid(controlObj, parentDiv) {
    for (let i = 0; i < newGame.playerOne.board.rows; i++) {
        for (let j = 0; j < newGame.playerOne.board.columns; j++) {
            const boardSquare = document.createElement("button");
            boardSquare.classList.add("board-square");
            boardSquare.setAttribute("id", `${i}-${j}`);
            parentDiv.appendChild(boardSquare);
            boardSquare.addEventListener("click", () => {
                newGame.playRound([i, j]);
            })
        }
    }
}
