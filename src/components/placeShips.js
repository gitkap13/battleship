const $ = require("jquery");
const initGame = require("./game");
const makeShip = require("../factories/ship");
const shipTypes = require("../reference/ship-types");

const checkSquares = (start, xAxis, length, occupiedList) => {
  start = start * 1; // convert to num
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
      let newShip = makeShip(shipTypes[shipType].size, shipType);
      newShip.occupiedSquares.push(...ship);
      occupied.push(...ship);
      finishedShips.push(newShip);
      shipsToMake.shift();
    }
  }
  return finishedShips;
};

// create initial board for player to select ship placement
const getShips = () => {
  let curShip = {
    type: null,
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
      if (curShip.type !== null && curShip.size !== null) {
        let coordinates = checkSquares(
          tile.value,
          curShip.xAxis,
          curShip.size,
          occupied
        );
        if (coordinates) {
          let newShip = makeShip(curShip.size, curShip.type);
          newShip.occupiedSquares = coordinates;
          occupied.push(...coordinates);
          ships.push(newShip);
          $("#xtoggle").removeClass("highlight");
          $(`#${curShip.type}`).remove();
          for (let i = 0; i < coordinates.length; i++) {
            $(`[value=${coordinates[i]}]`).attr("id", "placedship");
          }
          curShip = {
            type: null,
            size: null,
            xAxis: false,
          };
        }
        if (ships.length == 5) {
          startBtn.disabled = false;
          $("#ship-btn-container").remove();
          $("#startbtn").removeClass("hidden");
          $("#xtoggle").remove();
        }
      } else throw new Error("Invalid input: no ship selected");
    });
    container.appendChild(tile);
  }
  const startBtn = document.createElement("button");
  startBtn.setAttribute("id", "startbtn");
  startBtn.textContent = "Start";
  startBtn.disabled = true;
  startBtn.setAttribute("class", "hidden");
  startBtn.addEventListener("click", () => {
    $("#placement-container").remove();
    $("#ship-btn-container").remove();
    $("#startbtn").remove();
    $("#xtoggle").remove();
    initGame(ships, randomShips());
  });
  const xAxisToggle = document.createElement("button");
  xAxisToggle.setAttribute("id", "xtoggle");
  xAxisToggle.addEventListener("click", () => {
    if (curShip.xAxis === true) {
      curShip.xAxis = false;
      $("#xtoggle").removeClass("highlight");
    } else {
      curShip.xAxis = true;
      $("#xtoggle").addClass("highlight");
    }
  });
  xAxisToggle.textContent = "X-Axis";
  $("body").append(container);
  $("body").append(xAxisToggle);
  $("body").append(startBtn);

  const setShipOptions = (() => {
    const shipBtns = document.createElement("div");
    shipBtns.setAttribute("id", "ship-btn-container");
    const selectListener = (btn) => {
      return (curShip.size = shipTypes[btn.id].size), (curShip.type = btn.id);
    };

    Object.keys(shipTypes).forEach((key) => {
      let btn = document.createElement("btn");
      btn.setAttribute("id", `${key}`);
      btn.setAttribute("class", "ship-btns");
      btn.setAttribute("size", `${shipTypes[key].size}`);
      btn.textContent = `${shipTypes[key].size}`;
      btn.addEventListener("click", () => {
        $("[toggle]").removeAttr("toggle");
        btn.setAttribute("toggle", "true");
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
