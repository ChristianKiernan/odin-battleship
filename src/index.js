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

    const guessContainer = document.createElement("div");
    guessContainer.classList.add("guess-container");
    containerDiv.appendChild(guessContainer);

    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");
    containerDiv.appendChild(boardContainer);

    const playerOneDiv = document.createElement("div");
    playerOneDiv.classList.add("guess-list");
    playerOneDiv.setAttribute("id", "p1-list");
    guessContainer.appendChild(playerOneDiv);

    const playerOnePara = document.createElement("div");
    playerOnePara.classList.add("guess-text");
    playerOnePara.setAttribute("id", "p1-ui");
    playerOneDiv.appendChild(playerOnePara);

    const playerOneHead = document.createElement("h3");
    playerOneHead.innerHTML = "Coordinates Log:";
    playerOneDiv.appendChild(playerOneHead);

    const boardOneLeft = document.createElement("div");
    boardOneLeft.classList.add("board-coords");
    boardOneLeft.setAttribute("id", "one-left");
    boardContainer.appendChild(boardOneLeft);

    let labelList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let i = 0; i < labelList.length; i++) {
        const labelP = document.createElement("p");
        labelP.innerHTML = `${labelList[i]}`;
        boardOneLeft.appendChild(labelP);
    }

    const boardOneTop = document.createElement("div");
    boardOneTop.classList.add("board-coords");
    boardOneTop.setAttribute("id", "one-top");
    boardContainer.appendChild(boardOneTop);

    const boardOneTopSub = document.createElement("p");
    boardOneTopSub.classList.add("board-coords-sub");
    boardOneTopSub.setAttribute("id", "one-top-sub");
    boardOneTopSub.innerHTML = "0123456789";
    boardOneTop.appendChild(boardOneTopSub);

    const boardOneDiv = document.createElement("div");
    boardOneDiv.classList.add("board");
    boardOneDiv.setAttribute("id", "one");
    boardContainer.appendChild(boardOneDiv);

    const playerTwoDiv = document.createElement("div");
    playerTwoDiv.classList.add("guess-list");
    playerTwoDiv.setAttribute("id", "p2-list");
    guessContainer.appendChild(playerTwoDiv);

    const playerTwoHead = document.createElement("h3");
    playerTwoHead.innerHTML = "Coordinates Log:";
    playerTwoDiv.appendChild(playerTwoHead);

    const playerTwoPara = document.createElement("div");
    playerTwoPara.classList.add("guess-text");
    playerTwoDiv.appendChild(playerTwoPara);

    const playerTwoSubPara = document.createElement("div");
    playerTwoSubPara.classList.add("guess-text");
    playerTwoPara.appendChild(playerTwoSubPara);

    const boardTwoLeft = document.createElement("div");
    boardTwoLeft.classList.add("board-coords");
    boardTwoLeft.setAttribute("id", "two-left");
    boardContainer.appendChild(boardTwoLeft);

    for (let i = 0; i < labelList.length; i++) {
        const labelP = document.createElement("p");
        labelP.innerHTML = `${labelList[i]}`;
        boardTwoLeft.appendChild(labelP);
    }

    const boardTwoTop = document.createElement("div");
    boardTwoTop.classList.add("board-coords");
    boardTwoTop.setAttribute("id", "two-top");
    boardContainer.appendChild(boardTwoTop);

    const boardTwoTopSub = document.createElement("p");
    boardTwoTopSub.classList.add("board-coords-sub");
    boardTwoTopSub.setAttribute("id", "two-top-sub");
    boardTwoTopSub.innerHTML = "0123456789";
    boardTwoTop.appendChild(boardTwoTopSub);

    const boardTwoDiv = document.createElement("div");
    boardTwoDiv.classList.add("board");
    boardTwoDiv.setAttribute("id", "two");
    boardContainer.appendChild(boardTwoDiv);

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
    const p1Div = document.querySelector("#p1-ui");
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
    for (let i = guesses.length - 1; i < guesses.length; i++) {
        createSubPara().innerHTML = `(${guesses[i].Coords}): ${guesses[i].Type}`;
    }
}

function createSubPara() {
    const pOneDiv = document.querySelector("#p1-ui");

    const playerOneSubPara = document.createElement("p");
    playerOneSubPara.classList.add("guess-subtext");
    pOneDiv.appendChild(playerOneSubPara);
    return playerOneSubPara;
}
