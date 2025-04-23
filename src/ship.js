export class Ship {
    constructor(id, length) {
        this.id = id;
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
    setCoordinates(x, y) {
        return (this.coordinates = [x, y]);
    }
    resetCoordinates() {
        this.coordinates = null;
    }
}
