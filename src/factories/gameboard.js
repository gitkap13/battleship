const $ = require("jquery");

const makeBoard = (player = "", playerShips = []) => {
  const coordinates = [];
  const sunkShips = [];
  for (let i = 0; i < 100; i++) {
    coordinates.push({ location: i, isOccupied: false, attacked: false });
  }
  playerShips.forEach((ship) => {
    placeShip(ship);
  });

  function placeShip(ship) {
    if (ship.occupiedSquares.length > 1) {
      for (let i = 0; i < ship.occupiedSquares.length; i++) {
        coordinates[ship.occupiedSquares[i]].isOccupied = true;
      }
    }
  }

  function receiveAttack(tile) {
    if (!coordinates[tile].attacked) {
      coordinates[tile].attacked = true;
      if (coordinates[tile].isOccupied) {
        let target = playerShips.find((ship) =>
          ship.occupiedSquares.includes(tile * 1)
        );
        target.hit(tile);
        console.log(`${target} has been hit!`);
        $(`#${player}-${tile}`).attr("hit", "true");
        if (target.isSunk()) {
          sunkShips.push(target);
        }
        return true
      } else {
        $(`#${player}-${tile}`).attr("miss", "true");
        console.log("Miss!");
        return false
      }
    } else throw new Error("Invalid coordinate: already attacked.");
  }

  function checkShips() {
    if (sunkShips.length < playerShips.length) {
      return true;
    } else {
      console.log(`All of ${player}'s ships have sunk`);
      return false;
    }
  }

  return {
    player,
    coordinates,
    playerShips,
    placeShip,
    receiveAttack,
    checkShips,
  };
};

module.exports = makeBoard;
