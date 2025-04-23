import { Ship } from "./ship.js"
import { Gameboard } from "./gameboard.js";

//Ship class tests
test("registers a hit", () => {
    const ship = new Ship(5)
    ship.hit();
    expect(ship.hits).toEqual(1);
});

test("registers a sink", () => {
    const ship  = new Ship(0)
    ship.isSunk();
    expect(ship.sunk).toBe(true);
});

test("registers a hit but no sink", () => {
    const ship  = new Ship(2)
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(false);
});

test("sets coordinates", () => {
    const ship  = new Ship(3);
    ship.setCoordinates(1, 2);
    expect(ship.coordinates).toEqual([1, 2]);
});

test("reset coordinates", () => {
    const ship  = new Ship(3);
    ship.setCoordinates("A", 2);
    ship.resetCoordinates();
    expect(ship.coordinates).toEqual(null);
});

//Gameboard class tests

test("setBoard returns a board of x by y", () => {
    const gameboard  = new Gameboard();
    gameboard.setBoard();
    expect(gameboard.board[9][9].value).toEqual("empty");
});

test("placeShip sets the coordinates to 'full' in the gameboard", () => {
    const ship = new Ship(3);
    ship.setCoordinates(1, 2);
    
    const gameboard = new Gameboard();
    gameboard.setBoard();
    gameboard.placeShip(ship);

    expect(gameboard.board[1][2].value).toEqual("full");
});




