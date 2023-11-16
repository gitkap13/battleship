import './style.css';
const $ = require('jquery');
const getShips = require('./components/ship-placement')
const initGame = require('./components/init-game')
window.jQuery = $;
window.$ = $;
const startGame = async () => {
    const ships = getShips();
    };
startGame();
