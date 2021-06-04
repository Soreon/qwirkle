import Tile from './Tile.js';
import Board from './Board.js';

const stock = [];
const player1Tiles = [];
const player2Tiles = [];
const turn = null;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pickRandom() {
    shuffleArray(stock);
    return stock.pop();
}

function numberOfSame(tiles) {
    const criterias = {};
    tiles.forEach((tile) => {
        if(!criterias[tile.type]) criterias[tile.type] = [];
        criterias[tile.type].push(tile);
        if(!criterias[tile.color]) criterias[tile.color] = [];
        criterias[tile.color].push(tile);
    });
    let max = 1;
    for (const [key, value] of Object.entries(criterias)) {
        criterias[key] = value.filter((item, pos) => value.indexOf(item) === pos)
        max = Math.max(max, value.length);
    }
    return max;
}

//Création du plateau de jeu
const board = new Board(10, 10);

// Création des pièces
Tile.validTypes.forEach(type => {
    Tile.validColors.forEach(color => {
        for (let i = 0; i < 3; i++) {
            const tile = new Tile(type, color);
            stock.push(tile);
        }
    });
});
shuffleArray(stock);

// Attribution des 6 pièces aux 2 joueurs
for (let i = 0; i < 6; i++) {
    let tile = pickRandom();
    player1Tiles.push(tile);
    document.getElementById('player1Tiles').appendChild(tile.domElement);

    tile = pickRandom();
    player2Tiles.push(tile);
    document.getElementById('player2Tiles').appendChild(tile.domElement);
}

// Détermination du tour de jeu
console.log(numberOfSame(player1Tiles));
console.log(numberOfSame(player2Tiles));
