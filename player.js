const makeBoard = require('./gameboard');

function createPlayer(name='') {
    const isCPU = false;
    const board = makeBoard();
    const opBoard = board.grid; 
    return {name: name, board: board, opBoard: opBoard, isCPU: isCPU}
}

function createComPlayer(name='Computer') {
    const isCPU = true;
    const board = makeBoard();
    let possibleAttacks = (function() {
        let arr = []
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            arr.push([i, j]);
          }
        }
        return arr
      })();
    const attack = () => {
        let random = Math.floor(Math.random() * possibleAttacks.length)
        let attackSquare = possibleAttacks[random];
        possibleAttacks.splice(random, 1);
        return attackSquare
    }

    return {name: name, board: board, possibleAttacks: possibleAttacks, attack: attack}
}

module.exports = {createPlayer, createComPlayer}