const makeBoard = require("./gameboard");
const $ = require("jquery");
const playerSelections = {
  createHumanPlayer: (name = "", ships) => {
    const isCom = false;
    const active = false;
    const board = makeBoard(name, ships);
    return { name, isCom, active, board };
  },

  createComPlayer: (ships) => {
    const isCom = true;
    const active = false;
    const board = makeBoard("player2", ships);
    const sequenceCheck = (prev, cur) => {
      if (cur == prev + 1) {
        return cur + 1;
      }
      if (cur == prev - 1) {
        return cur - 1;
      }
      if (cur == prev + 10) {
        return cur + 10;
      }
      if (cur == prev - 10) {
        return cur - 10;
      } else return false;
    };
    const attacks = {
      availableAttacks: [],
      confirmedHits: [],
      likelyHits: [],
      randomAttack: () => {
          let index = Math.floor(Math.random() * attacks.availableAttacks.length);
          let target = attacks.availableAttacks[index];
          console.log(`com attack at ${target}`);
          attacks.availableAttacks.splice(index, 1);
          return target;
        },

      guessAttack: () => {
        let attack = attacks.likelyHits.shift();
        console.log(attack);
        if (attacks.availableAttacks.includes(attack)) {
          return attack;
        } else if (!attacks.availableAttacks.includes(attack) && attacks.likelyHits.length) {
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
      sequenceCheck,
      attacks,
    };
  },
};

module.exports = playerSelections;
