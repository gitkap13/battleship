const makeBoard = require('./gameboard');

test('makeBoard returns 10x10 board', () => {
    expect(makeBoard()).toHaveProperty('grid')
})
test('attack functions change tile state', () => {
    expect(makeBoard().receiveAttack(4,4))
})