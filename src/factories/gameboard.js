const $ = require("jquery");
const boomMp3 = new Audio("../src/assets/sounds/8-bit-boom.mp3");
const missMp3 = new Audio("../src/assets/sounds/8-bit-miss.mp3");
const cannonMp3 = new Audio("../src/assets/sounds/8-bit-cannon.mp3");
const sunkMp3 = new Audio("../src/assets/sounds/8-bit-bubbles.mp3");

// func to create 10x10 boards for players
// takes array of ships and
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

  // checks if target is valid and updates tile with hit or miss
  // if hit func will check if the ship placed on tile has sunk
  function receiveAttack(tile) {
    console.log(player)
    if (!coordinates[tile].attacked) {
      cannonMp3.play();
      $(`#${player}-${tile}`).attr("target", "true");
      coordinates[tile].attacked = true;
      if (coordinates[tile].isOccupied) {
        let target = playerShips.find((ship) =>
          ship.occupiedSquares.includes(tile * 1)
        );
        target.hit(tile);
        let sunk = target.isSunk();
        if (sunk) sunkShips.push(target);
        setTimeout(async() => {
          boomMp3.play();
          if (sunk){ 
            await sunkMp3.play();
            if (player == 'player2') $(`#${target.type}`).remove();
          }
          $(`#${player}-${tile}`).removeAttr("target");
          $(`#${player}-${tile}`).attr("hit", "true");
        }, 2000);
        return true;
      } else {
        setTimeout(() => {
          missMp3.play();
          $(`#${player}-${tile}`).removeAttr("target");
          $(`#${player}-${tile}`).attr("miss", "true");
        }, 2000);
        return false;
      }
    } else throw new Error("Invalid coordinate: already attacked.");
  }

  // checks if player still has floating ships
  function checkShips() {
    if (sunkShips.length < playerShips.length) {
      return true;
    } else {
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
