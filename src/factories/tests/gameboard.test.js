
const makeBoard = require("../gameboard");

describe("creates gameboard with functions", () => {
  let board = makeBoard();
  board.placeShip(4, 45, true);
  test("gameboard has array of coordinates", () => {
    expect(board.coordinates).toBeDefined();
  });
  test("gameboard updates with placeShip", () => {
    expect(board.coordinates[45].isOccupied).toBeTruthy()
  });
  test('receive attack updates gameboard', () => {
    board.receiveAttack(45);
    expect(board.coordinates[45].attacked).toBeTruthy();
  })
  test('receive attack updates ship hit', () => {
    expect(board.ships[0].hits).toContain(45)
  });
  test('check ships returns true if any ship active', () => {
    expect(board.checkShips()).toBeTruthy();
  });
  test('check ships returns false if all ships are sunk', () => {
    board.receiveAttack(46);
    board.receiveAttack(47);
    board.receiveAttack(48);
    expect(board.checkShips()).toBeFalsy()
  });


});
