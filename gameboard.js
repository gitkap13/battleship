const makeShip = require("./ship");
function makeBoard() {
  let grid = [];
  function makeSquare(x, y) {
    let coordinates = [x, y];
    let attacked = false;
    return { coordinates: coordinates, attacked: attacked };
  }
  (function fillGrid() {
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(makeSquare(i, j));
      }
      grid.push(row);
    }
  })();
  function receiveAttack(x, y) {
    grid[x][y].attacked = true;
  }
  receiveAttack(0, 1)
  return {grid:grid, receiveAttack:receiveAttack};
}

module.exports = makeBoard
