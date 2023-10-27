const makeShip = require('./ship');
test('ship has length, times hit, and sunk value', () => {
    expect(makeShip(3, 0, 0)).toHaveProperty('length');
    expect(makeShip(3)).toHaveProperty('hitCount');
    expect(makeShip(3)).toHaveProperty('sunk')
});