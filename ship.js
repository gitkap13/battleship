function makeShip(length=Number, x, y) {
    length = length;
    let coordinates = [x, y]
    let hitCount = 0;
    let sunk = false;
    const hit = () => {
        this.hitCount++
        isSunk()
    };
    const isSunk = () => {
        if (hitCount >= length){
            this.sunk = true
        }
    }
    return {length, coordinates, hitCount, sunk, hit, isSunk}
}
module.exports = makeShip