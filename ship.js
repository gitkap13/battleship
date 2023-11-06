const makeShip = (length) => {
  const occupiedSquares = [];
  const hits = [];
  let sunk = false;
  const hit = (location) => {
    hits.push(location);
    if (isSunk()) {sunk = true};
  };
  const isSunk = () => {
    if (hits.length >= length) {
      return sunk = true
    }
    else return sunk = false
  };
  return { length, occupiedSquares, hits, hit, isSunk, sunk };
};
module.exports = makeShip;
