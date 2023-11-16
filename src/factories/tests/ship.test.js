const makeShip = require('../ship');
describe.only('ship object', () => {
    let battleship = makeShip(4);
    test('battleship has length of 4', () => {
        expect(battleship.length).toBe(4)
    })
    test('hit function increases hits', () => {
        battleship.hit(33);
        expect(battleship.hits).toEqual([33])
    })
    test('isSunk returns false if hits <= length', () => {
        expect(battleship.isSunk()).toBeFalsy()
    })
    test('isSunk returns true if hits are >= length', () => {
        battleship.hit(34);
        battleship.hit(35);
        battleship.hit(36);
        expect(battleship.isSunk()).toBeTruthy()
    })
})