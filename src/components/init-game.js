const playerSelections = require("../factories/player");
const $ = require("jquery");

const initGame = (p1ships = [], p2ships = [], p1Name = "", p2Name = "") => {
  const player1 = playerSelections.createHumanPlayer("player1", p1ships);
  const player2 = playerSelections.createComPlayer(p2ships);
  let winner = null;
  player1.active = true;
  const displayResultMsg = (win = Boolean) => {
    let resultMsg = "";
    if (win) {
      resultMsg = "You Win!";
    }
    if (!win) {
      resultMsg = "Game Over \n All your ships have sunk!";
    }
    let container = document.createElement("div");
    container.setAttribute("id", "result-msg");
    let msg = document.createElement("p");
    msg.textContent = resultMsg;
    container.append(msg);
    $("body").append(container);
  };
  const playerTurn = async (curPlayer, player2, attack) => {
    if (curPlayer.active && winner === null) {
      await player2.board.receiveAttack(attack, "player2");
      let activeShips = player2.board.checkShips();
      console.log(`Player 2 received attack at ${attack}`);
      if (!activeShips) {
        winner = curPlayer;
        console.log(`game over, ${curPlayer.name} wins`);
        displayResultMsg();
        return;
      }
      curPlayer.active = false;
      player2.active = true;
      player2Turn(player2, curPlayer);
    } else return;
  };

  const player2Turn = (player2, player1) => {
    setTimeout(async () => {
      if (player2.active && winner === null) {
        console.log(player2.attacks.likelyHits);
        let attack = null;
        if (player2.attacks.likelyHits.length > 0) {
          attack = await player2.attacks.guessAttack();
          if (attack == undefined) {
            attack = await player2.attacks.randomAttack();
          }
        } else {
          attack = await player2.attacks.randomAttack();
        }
        let index = player2.attacks.availableAttacks.indexOf(attack);
        player2.attacks.availableAttacks.splice(index, 1);
        console.log(attack);
        console.log(index);
        let attackHit = player1.board.receiveAttack(attack);
        if (attackHit) {
          player2.attacks.confirmedHits.push(attack);
          player2.attacks.likelyHits = [];
          player2.attacks.likelyHits.push(attack + 1);
          player2.attacks.likelyHits.push(attack - 1);
          player2.attacks.likelyHits.push(attack + 10);
          player2.attacks.likelyHits.push(attack - 10);
        }
      }
      let activeShips = player1.board.checkShips();
      if (!activeShips) {
        winner = player2;
        console.log("game over, player2 wins");
        return;
      }

      player1.active = true;
      player2.active = false;
      return player2;
    }, "1000");
  };

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
    $("body").append(container);
    return container.children;
  };
  let player2BoardDisplay = initBoardDisplay("player2");
  let player1BoardDisplay = initBoardDisplay("player1");

  const attackListeners = (arr) => {
    arr.forEach((e) => {
      e.addEventListener("click", () => {
        let attack = e.value;
        playerTurn(player1, player2, attack);
      });
    });
  };
  attackListeners(Array.from(player2BoardDisplay));

  return {
    player1,
    player2,
    player1BoardDisplay,
    player2BoardDisplay,
    playerTurn,
    player2Turn,
  };
};

module.exports = initGame;
