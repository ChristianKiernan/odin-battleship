export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinates = null;
    }
    hit() {
        this.hits++;
    }
    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
            return this.sunk;
        }
        return false;
    }
    setCoordinates(x, n) {
        this.coordinates = [x][n];
    }
    resetCoordinates() {
        this.coordinates = null;
    }
}

