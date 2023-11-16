const {createHumanPlayer, createComPlayer} = require('../player');

describe('creates player with gameboards for self and target', () => {
    let testPlayer = createHumanPlayer('testplayer');
    let testComPlayer = createComPlayer();
    test('player is returned', () => {
        expect(testPlayer.board).toBeDefined();
        expect(testPlayer.targetBoard).toBeDefined();
    });
    test('computer player is returned', () => {
        expect(testComPlayer.board).toBeDefined();
        expect(testComPlayer.targetBoard).toBeDefined();
    })
    test('computer has list of available attack coordinates', () => {
        expect(testComPlayer.availableAttacks.length).toBe(100)
    })
    test('random attack returns number between 0 - 99', () => {
        expect(testComPlayer.randomAttack()).toBeGreaterThanOrEqual(0);
        testComPlayer.randomAttack();
        expect(testComPlayer.availableAttacks.length).toBeLessThan(99);
    })

})