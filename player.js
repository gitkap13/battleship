const makeBoard = require("./gameboard");
const createHumanPlayer = (name) => {
  const isCom = false;
  const board = makeBoard();
  const targetBoard = [];
  for (let i = 0; i < 100; i++)
    [targetBoard.push({ location: i, attacked: false, hit: null })];
  return { isCom, board, targetBoard };
};
const createComPlayer = () => {
  const isCom = true;
  const board = makeBoard();
  const targetBoard = [];
  for (let i = 0; i < 100; i++)
    [targetBoard.push({ location: i, attacked: false, hit: null })];
  const availableAttacks = targetBoard.map((obj) => {
    return obj.location;
  });
  const randomAttack = () => {
    let target = Math.floor(Math.random() * availableAttacks.length);
    console.log(target);
    availableAttacks.splice(target, 1);
    return target;
  };

  return { isCom, board, targetBoard, randomAttack, availableAttacks };
};

exports.createHumanPlayer = createHumanPlayer;
exports.createComPlayer = createComPlayer;
