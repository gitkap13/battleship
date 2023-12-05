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
    $("body").append(container);
  };

const displayHeader = () => {
  const header = document.createElement('h1');
  header.setAttribute('class', 'title');
  header.textContent = 'BATTLESHIP';
  $('body').append(header)
}


exports.initBoardDisplay = initBoardDisplay;
exports.displayResultMsg = displayResultMsg;
exports.displayHeader = displayHeader;