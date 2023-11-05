const createPlayer = require('./player');
const john = createPlayer.createPlayer('john');
const comp = createPlayer.createComPlayer();
console.log(comp)
test('returns player object with board', () => {
    expect(john).toBeDefined()
})
