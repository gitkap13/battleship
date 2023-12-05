const makeBoard = require("./gameboard");
const $ = require("jquery");

const playerSelections = {
  createHumanPlayer: (name = "", ships = []) => {
    const isCom = false;
    const active = false;
    const board = makeBoard(name, ships);
    return { name, isCom, active, board };
  },

  createComPlayer: (ships = []) => {
    const isCom = true;
    const active = false;
    const board = makeBoard("player2", ships);
    const attacks = {
      availableAttacks: [],
      likelyHits: [],
      randomAttack: () => {
        let index = Math.floor(Math.random() * attacks.availableAttacks.length);
        let target = attacks.availableAttacks[index];
        console.log(`com attack at ${target}`);
        attacks.availableAttacks.splice(index, 1);
        return target;
      },
      guessAttack: () => {
        let target = attacks.likelyHits.shift();
        target = target * 1;
        console.log(`com attack at ${target}`);
        if (attacks.availableAttacks.includes(target)) {
          attacks.availableAttacks.splice(
            attacks.availableAttacks.indexOf(target),
            1
          );
          return target;
        } else if (
          !attacks.availableAttacks.includes(target) &&
          attacks.likelyHits.length
        ) {
          return attacks.guessAttack();
        } else return attacks.randomAttack();
      },
    };
    for (let i = 0; i < 100; i++) {
      attacks.availableAttacks.push(i);
    }
    return {
      isCom,
      active,
      board,
      attacks,
    };
  },
  
};

module.exports = playerSelections;
