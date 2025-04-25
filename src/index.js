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

    const playerOnePara = document.createElement("div");
    playerOnePara.classList.add("guess-text");
    playerOnePara.setAttribute("id", "p1-ui");
    playerOneDiv.appendChild(playerOnePara);

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

    const playerTwoPara = document.createElement("div");
    playerTwoPara.classList.add("guess-text");
    playerTwoDiv.appendChild(playerTwoPara);

    const playerTwoSubPara = document.createElement("div");
    playerTwoSubPara.classList.add("guess-text");
    playerTwoPara.appendChild(playerTwoSubPara);

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
    let output = controllerObj.playerTwo.board.receiveAttack(cords);
    //Return value of 0 signifies a miss
    if (output === 0) {
        controllerObj.playerOne.setGuessList(cords, "Miss");
    }
    //Return value of 1 signifies a hit
    else if (output === 1) {
        controllerObj.playerOne.setGuessList(cords, "Hit");
    }
    const guesses = controllerObj.playerOne.getGuessList();
    console.log(guesses);
    for (let i = 0; i < guesses.length; i++) {
        createSubPara().innerHTML = `Coords: (${guesses[i].Coords})`;
        createSubPara().innerHTML = `Result: ${guesses[i].Type}`;
    }
}

function createSubPara() {
    const pOneDiv = document.querySelector("#p1-ui");

    const playerOneSubPara = document.createElement("p");
    playerOneSubPara.classList.add("guess-subtext");
    pOneDiv.appendChild(playerOneSubPara);
    return playerOneSubPara;
}
