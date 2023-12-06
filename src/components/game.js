const playerSelections = require("../factories/player");
const $ = require("jquery");
const { initBoardDisplay, displayResultMsg, displayActiveShips } = require("./display");
const gameMusic = new Audio("../src/assets/sounds/8-bit-music.mp3");
gameMusic.loop = true;
gameMusic.volume = 0.7;

const initGame = (p1ships = [], p2ships = []) => {
  gameMusic.play();
  const muteButton = document.createElement("btn");
  muteButton.setAttribute("id", "mute-btn");
  muteButton.addEventListener("click", () => {
    if (gameMusic.paused) {
      gameMusic.play();
      muteButton.removeAttribute("muted");
    } else {
      gameMusic.pause();
      muteButton.setAttribute("muted", "true");
    }
  });

  $(".title").remove();
  $("#radar").removeClass("hidden");
  $("body").append(muteButton);
  $('body').append(displayActiveShips());

  const player1 = playerSelections.createHumanPlayer("player1", p1ships);
  const player2 = playerSelections.createComPlayer(p2ships);
  let player2BoardDisplay = initBoardDisplay("player2");
  let player1BoardDisplay = initBoardDisplay("player1");
  let winner = null;
  player1.active = true;

  const playerTurn = async (player1, player2, attack) => {
    if (player1.active && winner === null) {
      await player2.board.receiveAttack(attack, "player2");
      if (player2.board.checkShips() === false) {
        winner = player1;
        displayResultMsg(true);
        return;
      } else {
        player1.active = false;
        player2.active = true;
        player2Turn(player2, player1);
      }
    } else return;
  };

  const player2Turn = (player2, player1) => {
    setTimeout(async () => {
      if (player2.active && winner === null) {
        let attack = null;
        if (player2.attacks.likelyHits.length > 0) {
          attack = await player2.attacks.guessAttack();
          if (attack == undefined) {
            attack = await player2.attacks.randomAttack();
          }
        } else {
          attack = await player2.attacks.randomAttack();
        }
        let attackHit = await player1.board.receiveAttack(attack);
        if (attackHit) {
          player2.attacks.likelyHits.push(attack + 1);
          player2.attacks.likelyHits.push(attack - 1);
          player2.attacks.likelyHits.push(attack + 10);
          player2.attacks.likelyHits.push(attack - 10);
        }
      }
      if (player1.board.checkShips() === false) {
        winner = player2;
        displayResultMsg(false);
        return;
      } else {
        player1.active = true;
        player2.active = false;
        return player2;
      }
    }, 3000);
  };

  // adds 'placed' class to player's tiles that are occupied
  for (let i = 0; i < p1ships.length; i++) {
    let ship = p1ships[i];
    for (let j = 0; j < ship.occupiedSquares.length; j++) {
      $(`#player1-${ship.occupiedSquares[j]}`).attr("placed", "true");
    }
  }
  // adds listeners to com board tiles that return tile value and initiates turn
  const attackListeners = (arr) => {
    arr.forEach((e) => {
      e.addEventListener("click", () => {
        playerTurn(player1, player2, e.value);
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
