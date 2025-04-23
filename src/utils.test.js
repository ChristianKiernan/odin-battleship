import { Ship } from "./ship.js"

test("registers a hit", () => {
    const ship  = new Ship(5)
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


