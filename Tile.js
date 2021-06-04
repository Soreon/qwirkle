export default class Tile {
    static validTypes = [ 'star', 'times', 'circle', 'square', 'diamond', 'leaf' ];
    static validColors = [ 'yellow', 'orange', 'red', 'purple', 'blue', 'green', ];
    neighbors = {
        up: null,
        right: null,
        bottom: null,
        left: null,
    };
    type = null;
    color = null;
    domElement = null;
    
    constructor(_type, _color) {
        this.type = _type;
        this.color = _color;
        this.createDOMElement()
    }

    createDOMElement() {
        this.domElement = document.createElement('div');
        this.domElement.classList.add('tile');
        this.domElement.classList.add(this.color);
        const i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add(`fa-${this.type}`);
        this.domElement.appendChild(i);
    }
}