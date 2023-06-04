var coords = {
    red: [0, 0],
    orange: [0, 8],
    yellow: [16, 0],
    green: [16, 8],
    blue: [32, 0],
    darkBlue: [32, 8],
    pink: [48, 0],
    grey: [48, 8]
}

var ANCHURA_LADRILLO = 20,
    ALTURA_LADRILLO = 10;

function Brick(x, y, color) {
    // TU CÓDIGO AQUÍ
    this.x = x;
    this.y = y;
    this.color = color;
    this.sprite = new Sprite('img/sprites.png', coords[color], [ANCHURA_LADRILLO, ALTURA_LADRILLO]);
}

Brick.prototype = {
    draw: function (ctx) {
        // TU CÓDIGO AQUÍ
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + ALTURA_LADRILLO);
        ctx.lineTo(this.x + ANCHURA_LADRILLO, this.y + ALTURA_LADRILLO);
        ctx.lineTo(this.x + ANCHURA_LADRILLO, this.y);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
};