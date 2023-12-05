import './style.css';
const $ = require('jquery');
const getShips = require('./components/placeShips')
window.jQuery = $;
window.$ = $;
const startGame = async () => {
    const ships = getShips();
    };

startGame();