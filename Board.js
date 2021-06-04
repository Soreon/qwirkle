export default class Board {
    width = 1;
    height = 1;
    tiles = []; 

    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.createPlaceholders();
    }

    createPlaceholders() {
        for (let i = 0; i < this.width * this.height; i++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            document.getElementById('board').appendChild(placeholder);
        }
        document.getElementById('board').style.gridTemplateColumns = `repeat(${this.width}, 50px)`;
        document.getElementById('board').style.gridTemplateRows = `repeat(${this.height}, 50px)`;
    }
}