import Tile from './Tile.js';
import Board from './Board.js';
import Player from './Player.js';

const stock = [];
const numberOfPlayer = 2;
const players = [];
let turn = null;

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
        if (!criterias[tile.type]) criterias[tile.type] = [];
        criterias[tile.type].push(tile);
        if (!criterias[tile.color]) criterias[tile.color] = [];
        criterias[tile.color].push(tile);
    });
    let max = 1;
    for (const [key, value] of Object.entries(criterias)) {
        criterias[key] = value.filter((item, pos, self) => pos === self.findIndex((obj) => obj.type === item.type && obj.color === item.color));
        max = Math.max(max, criterias[key].length);
    }
    return max;
}

//Création du plateau de jeu
const board = new Board(9, 9);

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

// Création des joueurs 
for (let i = 0; i < numberOfPlayer; i++) {
    players.push(new Player(i));
}
const children = document.getElementById('players').children;
for (let i = numberOfPlayer; i < 6; i++) {
    children.item(i).style.display = 'none';
}


// Attribution des 6 pièces aux joueurs
let tile = null;
for (let i = 0; i < numberOfPlayer; i++) {
    for (let j = 0; j < 6; j++) {
        tile = pickRandom();
        players[i].tiles.push(tile);
        players[i].tilesDOMContainer.appendChild(tile.domElement);
    }
}

console.log('Détermination du tour de jeu');

// Détermination du tour de jeu
const scores = [];
let max = 0;
for (let i = 0; i < numberOfPlayer; i++) scores.push({ key: i, value: numberOfSame(players[i].tiles) });
for (let i = 0; i < numberOfPlayer; i++) {
    max = Math.max(max, scores[i].value);
    console.log(`Joueur ${i}: ${scores[i].value}`);
}
const winners = scores.filter(s => s.value === max);
if (winners.length === 1) {
    turn = winners[0].key;
} else {
    console.log(`On tire au hasard entre les joueurs`, ...winners.map(e => `${e.key}`));
    turn = winners[Math.floor(Math.random() * winners.length)].key;
}

console.log(`Au tour de ${turn}`);
