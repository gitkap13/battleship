
//return ship object with coordinates and hit tracking
const makeShip = (length = 0) => {
  if (length > 0) {
    const occupiedSquares = [];
    const hits = [];
    let sunk = false;
    const hit = (tile) => {
      hits.push(tile);
    };
    const isSunk = () => {
      if (!sunk) {
        if (hits.length >= length) {
          sunk = true;
          console.log("ship has sunk!");
          return true;
        } else return false;
      } else return true;
    };
    return { length, occupiedSquares, hits, sunk, hit, isSunk };
  } else throw new Error('Ship creation error: ship length must be greater than 0.')
};

module.exports = makeShip;

