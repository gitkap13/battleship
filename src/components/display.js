const shipTypes = require('../reference/ship-types');
const $ = require('jquery');
const initBoardDisplay = (player) => {
  const container = document.createElement("div");
  container.setAttribute("id", `${player}-container`);
  container.setAttribute("class", "container");

  for (let i = 0; i < 100; i++) {
    let tile = document.createElement("button");
    tile.setAttribute("value", `${i}`);
    tile.setAttribute("id", `${player}-${i}`);
    tile.setAttribute("class", "tile");
    tile.setAttribute("hit", false);
    tile.setAttribute("miss", false);
    container.appendChild(tile);
  }
  $("#gameboard").append(container);
  return container.children;
};

const displayResultMsg = (win = Boolean) => {
    let resultMsg = "";
    if (win) {
      resultMsg = "You Win!";
    }
    if (!win) {
      resultMsg = `Game Over`;
    }
    let container = document.createElement("div");
    container.setAttribute("id", "resultmsg");
    let msg = document.createElement("p");
    msg.textContent = resultMsg;
    container.append(msg);
    let restart = document.createElement('button');
    restart.setAttribute('id', 'restart');
    restart.textContent = 'RESTART';
    restart.addEventListener('click', () => {
      location.reload()
    });
    container.append(restart)
    $("body").append(container);
  };

const displayHeader = () => {
  const header = document.createElement('h1');
  header.setAttribute('class', 'title');
  header.textContent = 'BATTLESHIP';
  $('body').append(header)
}
const displayActiveShips = () => {
  let container = document.createElement('div');
  container.setAttribute('id', 'active-ship-display');
  let title = document.createElement('p');
  title.setAttribute('id', 'ship-title')
  title.textContent = 'ENEMY SHIPS REMAINING';

  container.append(title);
  Object.keys(shipTypes).forEach((key) => {
    let div = document.createElement("div");
    div.textContent = `${shipTypes[key].size}`;
    div.setAttribute("id", `${key}`);
    div.setAttribute("class", "ship-img");
    div.style.backgroundImage = `url(${shipTypes[key].img})`;
    container.append(div);
  });
 return container
}

exports.initBoardDisplay = initBoardDisplay;
exports.displayResultMsg = displayResultMsg;
exports.displayHeader = displayHeader;
exports.displayActiveShips = displayActiveShips;