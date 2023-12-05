const $ = require("jquery");
const {hitMessage, missMessage} = require('../components/display');
const boomMp3 = new Audio("../src/assets/sounds/8-bit-boom.mp3");
const missMp3 = new Audio("../src/assets/sounds/8-bit-miss.mp3");
const cannonMp3 = new Audio("../src/assets/sounds/8-bit-cannon.mp3");

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
      cannonMp3.play();
      $(`#${player}-${tile}`).attr("target", "true");
      coordinates[tile].attacked = true;
      if (coordinates[tile].isOccupied) {
        let target = playerShips.find((ship) =>
          ship.occupiedSquares.includes(tile * 1)
        );
        setTimeout(() => {
          $('#hitmsg').removeClass('hidden');
          setTimeout(() => {$('#hitmsg').addClass('hidden');}, 500)
          target.hit(tile);
          boomMp3.play();
          $(`#${player}-${tile}`).removeAttr("target");
          $(`#${player}-${tile}`).attr("hit", "true");
          if (target.isSunk()) {
            sunkShips.push(target);
          }
        }, 2000);
        return true;
      } else {
      setTimeout(() => {
        $('#missmsg').removeClass('hidden');
        setTimeout(() => {$('#missmsg').addClass('hidden');}, 500)
        missMp3.play();
        $(`#${player}-${tile}`).removeAttr("target");
        $(`#${player}-${tile}`).attr("miss", "true");
      }, 2000)
        return false;
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
