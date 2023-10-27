const makeBoard = require('./gameboard');

test('makeBoard returns 10x10 board', () => {
    expect(makeBoard()).toHaveProperty('grid')
})