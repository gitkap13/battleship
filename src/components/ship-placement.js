const $ = require("jquery");
const initGame = require("./init-game");
const makeShip = require("../factories/ship");
const shipTypes = require("../reference/ship-types");

const checkSquares = (start, xAxis, length, occupiedList) => {
  start = start*1 // convert to num
  let validSquares = [];
  if (xAxis) {
    // gets first digit in start
    // added 10 to value to compensate for 0-9 being single digit
    let row = (start + 10).toString().slice(0, 1);
    for (let i = 0; i < length; i++) {
      if (start + i < 100 && (start + i + 10).toString().slice(0, 1) == row) {
        validSquares.push(start + i);
      } else return false;
    }
  } else {
    for (let i = 0; i < length; i++) {
      let tile = start - i * 10;
      if (tile < 100 && tile >= 0) {
        validSquares.push(tile);
      } else return false;
    }
  }
  let invalidPlacement = validSquares.some((s) => {
    if (occupiedList.includes(s)) {
      return true;
    } else return false;
  });
  if (!invalidPlacement) return validSquares;
  else return false;
};

// returns array of randomly placed ship objects
const randomShips = () => {
  let shipsToMake = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];
  let occupied = [];
  let finishedShips = [];
  while (finishedShips.length < 5) {
    //pulls first ship from list & randomly selects ship attributes
    let shipType = shipsToMake[0];
    let xAxis = Math.random() < 0.5;
    let start = Math.floor(Math.random() * 100);
    //checks if placement is valid
    let ship = checkSquares(
      start,
      xAxis,
      shipTypes[`${shipType}`].size,
      occupied
    );
    if (ship) {
      let newShip = makeShip(shipTypes[shipType].size);
      newShip.occupiedSquares.push(...ship);
      occupied.push(...ship);
      finishedShips.push(newShip);
      shipsToMake.shift()
    }
  }
  return finishedShips;
};

// create initial board for player to select ship placement
const getShips = () => {
  let curShip = {
    name: null,
    size: null,
    xAxis: false,
  };
  const ships = [];
  const occupied = [];

  // create container for tiles
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  container.setAttribute("id", "placement-container");

  // create tiles with hover & click events to set ship placement
  for (let i = 0; i < 100; i++) {
    let tile = document.createElement("button");
    tile.setAttribute("value", `${i}`);
    tile.setAttribute("class", "tile");
    tile.addEventListener("mouseover", () => {
      if (curShip.xAxis == true) {
        for (let j = 0; j < curShip.size; j++) {
          $(`[value=${i + j}]`).removeClass("tile");
          $(`[value=${i + j}]`).addClass("highlight");
        }
      } else {
        for (let j = 0; j < curShip.size; j++) {
          $(`[value=${i - j * 10}]`).removeClass("tile");
          $(`[value=${i - j * 10}]`).addClass("highlight");
        }
      }
    });
    tile.addEventListener("mouseout", () => {
      if (curShip.xAxis == true) {
        for (let j = 0; j < curShip.size; j++) {
          $(`[value=${i + j}]`).removeClass("highlight");
          $(`[value=${i + j}]`).addClass("tile");
        }
      } else {
        for (let j = 0; j < curShip.size; j++) {
          $(`[value=${i - j * 10}]`).removeClass("highlight");
          $(`[value=${i - j * 10}]`).addClass("tile");
        }
      }
    });
    tile.addEventListener("click", () => {
      if (curShip.name !== null && curShip.size !== null) {
        let coordinates = checkSquares(
          tile.value,
          curShip.xAxis,
          curShip.size,
          occupied
        );
        if (coordinates) {
          let newShip = makeShip(curShip.size);
          newShip.occupiedSquares = coordinates;
          occupied.push(...coordinates);
          ships.push(newShip);
          $(`#${curShip.name}`).remove();
          for (let i = 0; i < coordinates.length; i++) {
            $(`[value=${coordinates[i]}]`).attr("id", "placedship");
          }
          curShip = {
            name: null,
            size: null,
            xAxis: false,
          };
        }
        if (ships.length == 5) {
          startBtn.disabled = false;
        }
      } else throw new Error("Invalid input: no ship selected");
    });
    container.appendChild(tile);
  }

  $("body").append(container);

  const startBtn = document.createElement("button");
  startBtn.setAttribute("id", "startbtn");
  startBtn.textContent = "Start";
  startBtn.disabled = true;
  startBtn.addEventListener("click", () => {
    $("#placement-container").remove();
    $("#ship-btn-container").remove();
    $("#startbtn").remove();
    initGame(ships, randomShips());
  });
  $("body").append(startBtn);

  const setShipOptions = (() => {
    const shipBtns = document.createElement("div");
    shipBtns.setAttribute("id", "ship-btn-container");

    const selectListener = (btn) => {
      return (curShip.size = shipTypes[btn.id].size), (curShip.name = btn.id);
    };

    const xAxisToggle = document.createElement("button");
    xAxisToggle.setAttribute("id", "xtoggle");
    xAxisToggle.addEventListener("click", () => {
      if (curShip.xAxis === true) {
        curShip.xAxis = false;
      } else {
        curShip.xAxis = true;
      }
    });
    xAxisToggle.textContent = "Toggle Axis";
    shipBtns.append(xAxisToggle);

    Object.keys(shipTypes).forEach((key) => {
      let btn = document.createElement("btn");
      btn.setAttribute("id", `${key}`);
      btn.setAttribute("class", "ship-btns");
      btn.setAttribute("size", `${shipTypes[key].size}`);
      btn.addEventListener("click", () => {
        selectListener(btn);
      });
      btn.style.backgroundImage = `url(${shipTypes[key].img})`;
      shipBtns.append(btn);
    });
    $("body").append(shipBtns);
  })();

  return ships;
};

module.exports = getShips;
