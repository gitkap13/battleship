const makeShip = require('./ship');

test('makeShip returns ship object', () => {
    expect(makeShip(3, 4, 4)).toBeDefined()
})