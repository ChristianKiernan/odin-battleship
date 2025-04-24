import { Controller } from "./controller";

setDomElements();
// const newGame = new Controller();
// newGame.playRound();

function setDomElements() {
    const body = document.querySelector("body");

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    document.body.appendChild(containerDiv);

    const boardOneDiv = document.createElement("div");
    boardOneDiv.classList.add("board");
    boardOneDiv.setAttribute("id", "one")
    containerDiv.appendChild(boardOneDiv);

    const messageBoard = document.createElement("div");
    messageBoard.classList.add("message");
    containerDiv.appendChild(messageBoard);

    const boardTwoDiv = document.createElement("div");
    boardTwoDiv.classList.add("board");
    boardTwoDiv.setAttribute("id", "two");
    containerDiv.appendChild(boardTwoDiv);
}