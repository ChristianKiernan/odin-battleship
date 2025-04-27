import { Controller } from "./controller";

const newGame = new Controller();
setDomElements(newGame);
setShipDisplay(newGame);
addBtnEventsOne(newGame);

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

    const welcomeMessage = document.createElement("h1");
    welcomeMessage.classList.add("title-message");
    welcomeMessage.innerHTML = "Welcome to<br>Battleship";
    guessContainer.appendChild(welcomeMessage);

    const playerOnePara = document.createElement("div");
    playerOnePara.classList.add("guess-text");
    playerOnePara.setAttribute("id", "p1-ui");
    playerOneDiv.appendChild(playerOnePara);

    const playerOneHead = document.createElement("h3");
    playerOneHead.innerHTML = "Player One Coordinate Log:";
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
    playerTwoHead.innerHTML = "Player Two Coordinate Log:";
    playerTwoDiv.appendChild(playerTwoHead);

    const playerTwoPara = document.createElement("div");
    playerTwoPara.classList.add("guess-text");
    playerTwoPara.setAttribute("id", "p2-ui");
    playerTwoDiv.appendChild(playerTwoPara);

    const centerConsole = document.createElement("div");
    centerConsole.classList.add("center-console");
    boardContainer.appendChild(centerConsole);

    const consoleTitle = document.createElement("h3");
    consoleTitle.innerHTML = "Battle Console";
    centerConsole.appendChild(consoleTitle);

    const centerText = document.createElement("p");
    centerText.classList.add("center-console-text");
    centerConsole.appendChild(centerText);

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
            boardSquare.classList.add(
                "board-square",
                "square-red",
                "square-green",
                "square-grey"
            );
            boardSquare.setAttribute("class", "board-square");
            boardSquare.setAttribute("id", `${i} ${j}`);
            parentDiv.appendChild(boardSquare);
        }
    }
}

function addBtnEventsOne(controlObj) {
    const parentDiv = document.querySelector("#two");
    const buttons = parentDiv.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let btnId = button.getAttribute("id");
            let btnCords = btnId.split(" ").map(Number);
            if (controlObj.getActivePlayer().name === "Player One") {
                const outcome = playNewRound(controlObj, btnCords);
                if (outcome === "miss") {
                    button.classList.toggle("square-red");
                } else if (outcome === "hit") {
                    button.classList.toggle("square-green");
                }
            }
        });
    });
}

function updateBoardOneDisplay(coords, type) {
    const parentDiv = document.querySelector("#one");
    const buttons = parentDiv.querySelectorAll("button");
    buttons.forEach((button) => {
        let btnId = button.getAttribute("id");
        let btnCords = btnId.split(" ").map(Number);
        if (btnCords[0] === coords[0] && btnCords[1] === coords[1]) {
            if (type === "miss") {
                button.classList.toggle("square-red");
            } else if (type === "hit") {
                button.classList.remove("square-grey");
                button.classList.toggle("square-green");
            }
        }
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
                square.classList.toggle("square-grey");
            }
        }
    }
}

function playNewRound(controllerObj, cords) {
    let textDiv = document.querySelector(".center-console-text");
    let output = controllerObj.playerTwo.board.receiveAttack(cords);

    if (output === "miss") {
        controllerObj.playerOne.setGuessList(cords, "Miss");
        updateGuessDisplayOne(controllerObj);
        controllerObj.switchTurns();
        textDiv.innerHTML = `Miss! Your turn, ${
            controllerObj.getActivePlayer().name
        }.`;
        getRandCoords(controllerObj, textDiv);
        return "miss";
    } else if (output === "hit") {
        controllerObj.playerOne.setGuessList(cords, "Hit");
        updateGuessDisplayOne(controllerObj);
        controllerObj.switchTurns();
        textDiv.innerHTML = `Hit! Your turn, ${
            controllerObj.getActivePlayer().name
        }.`;
        getRandCoords(controllerObj, textDiv);
        return "hit";
    } else if (output === "invalid") {
        textDiv.innerHTML = "Try attacking at different coordinates.";
        return;
    }
}

function computerAttack(cords, controllerObj, textDiv) {
    let output = controllerObj.playerOne.board.receiveAttack(cords);

    if (output === "miss") {
        controllerObj.playerTwo.setGuessList(cords, "Miss");
        updateGuessDisplayTwo(controllerObj);
        updateBoardOneDisplay(cords, "miss");
        controllerObj.switchTurns();
        textDiv.innerHTML = `Miss! Your turn, ${
            controllerObj.getActivePlayer().name
        }.`;
        return "miss";
    } else if (output === "hit") {
        controllerObj.playerTwo.setGuessList(cords, "Hit");
        updateGuessDisplayTwo(controllerObj);
        updateBoardOneDisplay(cords, "hit");
        controllerObj.switchTurns();
        textDiv.innerHTML = `Hit! Your turn, ${
            controllerObj.getActivePlayer().name
        }.`;
        return "hit";
    }
    getRandCoords(controllerObj, textDiv);
}

function getRandCoords(controllerObj, textDiv) {
    controllerObj.playerTwo.setPossibleList();
    let possibleList = controllerObj.playerTwo.getPossibleList();
    let index = Math.floor(Math.random() * possibleList.length);
    let coords = possibleList[index];
    let xcord = coords[0];
    let ycord = coords[1];
    controllerObj.playerTwo.removeFromPossibleList(possibleList, xcord, ycord);
    computerAttack(coords, controllerObj, textDiv);
}

function updateGuessDisplayOne(controllerObj) {
    const guesses = controllerObj.playerOne.getGuessList();
    for (let i = guesses.length - 1; i < guesses.length; i++) {
        createSubParaOne().innerHTML = `(${guesses[i].Coords}): ${guesses[i].Type}`;
    }
}

function updateGuessDisplayTwo(controllerObj) {
    const guesses = controllerObj.playerTwo.getGuessList();
    for (let i = guesses.length - 1; i < guesses.length; i++) {
        createSubParaTwo().innerHTML = `(${guesses[i].Coords}): ${guesses[i].Type}`;
    }
}

function createSubParaOne() {
    const pOneDiv = document.querySelector("#p1-ui");

    const playerOneSubPara = document.createElement("p");
    playerOneSubPara.classList.add("guess-subtext");
    pOneDiv.appendChild(playerOneSubPara);
    return playerOneSubPara;
}

function createSubParaTwo() {
    const pTwoDiv = document.querySelector("#p2-ui");

    const playerTwoSubPara = document.createElement("p");
    playerTwoSubPara.classList.add("guess-subtext");
    pTwoDiv.appendChild(playerTwoSubPara);
    return playerTwoSubPara;
}
