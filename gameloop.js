const player = require("./player");
const initUI = () => {
    let body = document.body
    while (body.firstChild) {
        body.removeChild(body.firstChild)
    };
    let curBoard = document.createElement('div');
    curBoard.setAttribute('id', 'curBoard');
    let tarBoard = document.createElement('div');
    tarBoard.setAttribute('id', 'tarBoard');
    body.append(tarBoard, curBoard);
}
const playGame = (player1 = "", player2 = "") => {
    const p1 = player.createPlayer(player1);
    const p2 = player.createComPlayer(player2);
    p1.board.placeShip(3, 2, 3, true);
    p1.board.placeShip(2, 8, 4, true);
    p2.board.placeShip(3, 2, 3, true);
    p2.board.placeShip(2, 8, 4, true);
    const setBoardDisplay = (curUser) => {
        if (curUser.isCPU) {
            return
        }
        else {
            let cur = document.getElementById('curBoard');
            let tar = document.getElementById('tarBoard');
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    let curNode = document.createElement('div');
                    let tarNode = document.createElement('div');
                    curNode.setAttribute('id', `${i}${j}`);
                    tarNode.setAttribute('id', `${i}${j}`);
                    cur.appendChild(curNode);
                    tar.appendChild(tarNode);
                }
            }
        }
    
    }
  initUI();
  let current = p1;
  let target = p2;
  setBoardDisplay(current);
  while (p1.board.checkShips() && p2.board.checkShips()) {
    if (current.isCPU) {
        target.board.receiveAttack(current.attack);
        console.log('com attack')
        
    }
    else {
   
    let str = prompt('attack coordinates [xy]');
    target.board.receiveAttack(...str)}
    if (target == p1) {
        current = p1
        target = p2
    }else if (target == p2) {
        current = p2
        target = p1
    }
  }
};

module.exports = playGame
