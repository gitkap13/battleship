const makeShip = require("./ship");

function makeBoard() {

  let grid, ships = [];

  function makeSquare(x, y) {
    let coordinates = [x, y];
    let attacked = false;
    let occupied = false;
    let occupyingShip = null;
    return { coordinates: coordinates, attacked: attacked, occupied: occupied, occupyingShip };
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
    if (!grid[x][y].attacked) {
      grid[x][y].attacked = true;
      
      if (grid[x][y].occupied) {
        console.log('ship hit!')

        grid[x][y].occupyingShip.hitCount += 1;
        if (grid[x][y].occupyingShip.hitCount >= grid[x][y].occupyingShip().shipLength) {
          grid[x][y].occupyingShip.sunk = true;
          console.log('ship sunk!')
          checkShips();
        }
      }
      else console.log('ship miss!')
    } else console.log("invalid coordinate, already attacked");
  }
  // add condition if squares are available
  // add condition if ship is available (maybe add to UI)
  
  const placeShip = (length, x, y, vertical) => {
    const ship = makeShip(length, x, y, vertical);
    if (vertical) {
      for (let i = 0; i < length; i++) {
        if (grid.coordinates[x][y+i].occupied) {
        let x = ship.coordinates[i][0];
        let y = ship.coordinates[i][1];
        grid[x][y+i].occupied = true;
        grid[x][y+i].occupyingShip = this.ship
      } else return console.log('square unavailable')}
      ships.push(ship);
      return ship
    } 
  else if (!vertical) {

  } }   
  }

  function checkShips() {
    let check = ships.find((ship) => ship.sunk == false);
    if (!check) {
      return false;
    } else return true;
  }

  return {
    grid: grid,
    receiveAttack: receiveAttack,
    placeShip: placeShip,
    ships: ships,
    checkShips: checkShips,
  };

module.exports = makeBoard;
