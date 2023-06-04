function Bonus() {
    this.type = 'C'; // para este ejemplo, sólo un tipo y marcado a fuego (hard-coded)
    this.x = Math.floor(Math.random() * (230-16)); // para este ejemplo, el bonus saldrá de esta posición. En el juego
    this.y = Math.floor(Math.random() * 50); //  debería salir al azar desde la posición del ladrillo roto más reciente
    this.width = 16;  // ancho y alto
    this.height = 8;
    this.speed = 40; // velocidad, puedes trastear para ajustarla a lo que más te guste
    this.sprite = new Sprite('img/sprites.png', [224, 0], [16, 8], 0.005, [0, 1, 2, 3]);
    // las coordenadas del bonus verde, su anchura y su altura.
    // Queremos una animación lenta (0.5) y usar sólo 4 frames, del 0 al 3.
};

Bonus.prototype = {
    draw: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        this.sprite.render(ctx); // pintar el bonus en su posición x,y
        ctx.restore();
    },
    move: function (delta, calcDistanceToMove) {
        this.sprite.update(delta); // apuntar al nuevo frame de la animación
        this.y += calcDistanceToMove(delta, this.speed); // mover el bonus hacia abajo
    }
};