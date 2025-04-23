import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";

//Ship class tests
test("registers a hit", () => {
    const ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toEqual(1);
});

test("registers a sink", () => {
    const ship = new Ship("ship", 0);
    ship.isSunk();
    expect(ship.sunk).toBe(true);
});

test("registers a hit but no sink", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(false);
});

test("sets coordinates", () => {
    const ship = new Ship(3);
    ship.setCoordinates(1, 2);
    expect(ship.coordinates).toEqual([1, 2]);
});

test("reset coordinates", () => {
    const ship = new Ship(3);
    ship.setCoordinates("A", 2);
    ship.resetCoordinates();
    expect(ship.coordinates).toEqual(null);
});

//Gameboard class tests
test("Test ability to edit ship object through the gameboard", () => {
    const gameboard = new Gameboard();
    gameboard.destroyer.hit();
    expect(gameboard.destroyer.hits).toBe(1);
});

test("setBoard returns a board of x by y", () => {
    const gameboard = new Gameboard();
    gameboard.setBoard();
    expect(gameboard.board[9][9].value).toEqual("empty");
});

test("placeShip 'down' sets correct coordinates to 'full' in the gameboard", () => {
    const ship = new Ship("test1", 3);
    const initialCords = [2, 3];

    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.placeShip(ship, initialCords, "down");

    expect(gameboard.board[2][3].value).toEqual("test1");
    expect(gameboard.board[2][4].value).toEqual("test1");
    expect(gameboard.board[2][5].value).toEqual("test1");
    expect(gameboard.board[2][6].value).toEqual("empty");
    expect(gameboard.board[2][2].value).toEqual("empty");
});

test("placeShip 'up' sets the coordinates to 'full' in the gameboard", () => {
    const ship = new Ship("test2", 3);
    const initialCords = [2, 3];

    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.placeShip(ship, initialCords, "up");

    expect(gameboard.board[2][3].value).toEqual("test2");
    expect(gameboard.board[2][2].value).toEqual("test2");
    expect(gameboard.board[2][1].value).toEqual("test2");
    expect(gameboard.board[2][4].value).toEqual("empty");
    expect(gameboard.board[2][0].value).toEqual("empty");
});

test("placeShip 'left' sets the coordinates to 'full' in the gameboard", () => {
    const ship = new Ship("test3", 3);
    const initialCords = [2, 3];

    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.placeShip(ship, initialCords, "left");

    expect(gameboard.board[2][3].value).toEqual("test3");
    expect(gameboard.board[1][3].value).toEqual("test3");
    expect(gameboard.board[0][3].value).toEqual("test3");
    expect(gameboard.board[2][0].value).toEqual("empty");
});

test("placeShip 'right' sets the coordinates to 'full' in the gameboard", () => {
    const ship = new Ship("test4", 3);
    const initialCords = [2, 3];

    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.placeShip(ship, initialCords, "right");

    expect(gameboard.board[2][3].value).toEqual("test4");
    expect(gameboard.board[3][3].value).toEqual("test4");
    expect(gameboard.board[4][3].value).toEqual("test4");
    expect(gameboard.board[2][2].value).toEqual("empty");
});

test("setGuessList registers a guess", () => {
    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.setGuessList([0, 1])
    expect(gameboard.guessList).toEqual([[0, 1]]);
});

test("receiveAttack registers a hit on destroyer", () => {
    const initialCords = [2, 3];

    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.placeShip(gameboard.destroyer, initialCords, "right");
    gameboard.receiveAttack([2, 3]);

    expect(gameboard.destroyer.hits).toEqual(1);
});