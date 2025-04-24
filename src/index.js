import { Controller } from "./controller";

const newGame = new Controller();
setDomElements(newGame);
setShipDisplay(newGame);
addBtnEvents(newGame);

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
    playerOneHead.innerHTML = "Coordinates Guessed:";
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
    playerTwoHead.innerHTML = "Coordinates Guessed:";
    playerTwoDiv.appendChild(playerTwoHead);

    const boardTwoDiv = document.createElement("div");
    boardTwoDiv.classList.add("board");
    boardTwoDiv.setAttribute("id", "two");
    containerDiv.appendChild(boardTwoDiv);

    createBoardGrid(controllerObj, boardOneDiv);
    createBoardGrid(controllerObj, boardTwoDiv);
}

function createBoardGrid(controlObj, parentDiv) {
    for (let i = 0; i < controlObj.playerTwo.board.rows; i++) {
        for (let j = 0; j < controlObj.playerTwo.board.columns; j++) {
            const boardSquare = document.createElement("button");
            boardSquare.classList.add("board-square");
            boardSquare.setAttribute("id", `${i} ${j}`);
            parentDiv.appendChild(boardSquare);
        }
    }
}

function addBtnEvents(controlObj) {
    const parentDiv = document.querySelector("#two");
    const buttons = parentDiv.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let btnId = button.getAttribute("id");
            let btnCords = btnId.split(" ").map(Number);
            if (controlObj.getActivePlayer() === controlObj.players[0]) {
                playNewRound(controlObj, btnCords);
            }
        });
    });
}

function setShipDisplay(controllerObj) {
    controllerObj.setUpOne();
    controllerObj.setUpTwo();

    let arr = controllerObj.playerOne.board.board;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].value !== "empty") {
                let square = document.getElementById(`${i} ${j}`);
                square.style.backgroundColor = "lightblue";
            }
        }
    }
}

function playNewRound(controllerObj, cords) {
    console.log(controllerObj.playerTwo.board.receiveAttack(cords));
    if (controllerObj.playerTwo.board.receiveAttack(cords) === "Miss") {
        controllerObj.playerOne.setGuessList(cords);
        console.log(getGuessList());
    }
    else if (controllerObj.playerTwo.board.receiveAttack(cords)) {
    }
}
