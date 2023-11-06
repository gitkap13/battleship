const makeShip = require("./ship");

const makeBoard = () => {
  const coordinates = [];
  const ships = []
  //create 10x10 grid, assign each a value from 0 - 99
  for (let i = 0; i < 100; i++) {
    coordinates.push({ location: i, isOccupied: false, attacked: false });
  }

  const placeShip = (length, location, xAxis) => {
    const ship = makeShip(length);
    if (xAxis) {
      for (let i = 0; i < ship.length; i++) {
        coordinates[location + i].isOccupied = true;
        ship.occupiedSquares.push(location + i);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        coordinates[location + i * 10].isOccupied = true;
        ship.occupiedSquares.push(location + i * 10);
      }
    }
    ships.push(ship)
    return { ship };
  };

  const receiveAttack = (location) => {
    if (!coordinates[location].attacked) {
      coordinates[location].attacked = true;
      if (coordinates[location].isOccupied) {
        let target = ships.find((s) => s.occupiedSquares.includes(location));
        target.hit(location);
      }
    }
  }
  const checkShips = () => {
    const activeShip = ships.some((ship) => ship.isSunk() == false);
    if (activeShip) {
      return true
    }
    else return false
  }

  return { coordinates, ships, placeShip, receiveAttack, checkShips };
};

module.exports = makeBoard;
