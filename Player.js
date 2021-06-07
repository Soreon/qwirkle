export default class Player {
    index = null;
    tiles = Array(6);
    tilesDOMContainer = null;

    constructor(_index) {
        this.index = _index;
        this.tilesDOMContainer = document.getElementById('players').children.item(_index);
    }
}