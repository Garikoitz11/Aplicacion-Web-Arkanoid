function inicializarJuego() {
    // Variables globales de utilidad
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    // var x = 130,
    //  y = 135; // posición inicial de Vaus
    var delta;
    var ANCHURA_LADRILLO = 20,
        ALTURA_LADRILLO = 10;

    // var frames = 30;

    function intersects(left, up, right, bottom, cx, cy, radius) {
        var closestX = (cx < left ? left : (cx > right ? right : cx));
        var closestY = (cy < up ? up : (cy > bottom ? bottom : cy));
        var dx = closestX - cx;
        var dy = closestY - cy;
        var side;

        var dt = Math.abs(up - cy);
        var db = Math.abs(bottom - cy);
        var dr = Math.abs(right - cx);
        var dl = Math.abs(left - cx);
        var dm = Math.min(dt, db, dr, dl);
        switch (dm) {
            case dt:
                side = "top";
                break;
            case db:
                side = "bottom";
                break;
            case dr:
                side = "right";
                break;
            case dl:
                side = "left";
                break;
        }

        return result = { c: (dx * dx + dy * dy) <= radius * radius, d: side };
    }

    // Collisions between rectangle and circle
    function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
        var testX = cx;
        var testY = cy;

        if (testX < x0)
            testX = x0;
        if (testX > (x0 + w0))
            testX = (x0 + w0);
        if (testY < y0)
            testY = y0;
        if (testY > (y0 + h0))
            testY = (y0 + h0);

        return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
    }

    function testCollisionWithWalls(ball, w, h) {
        // TU CÓDIGO AQUÍ
        if (ball.x + ball.diameter / 2 > w) {
            ball.angle = -ball.angle + Math.PI;
            ball.x = w - ball.diameter / 2
            return false;
        }
        if (ball.x < ball.diameter / 2) {
            ball.angle = -ball.angle + Math.PI;
            ball.x = ball.diameter / 2
            return false;
        }
        if (ball.y < ball.diameter / 2) {
            ball.angle = -ball.angle;
            ball.y = ball.diameter / 2;
            return false;
        }
        if (ball.y + ball.diameter / 2 > h) {
            ball.angle = -ball.angle;
            ball.y = h - ball.diameter / 2;
            return true;
        }
    }

    function Brick(x, y, color) {
        // TU CÓDIGO AQUÍ
        this.x = x;
        this.y = y;
        this.color = color;
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


    // función auxiliar
    var calcDistanceToMove = function (delta, speed) {
        // TU CÓDIGO AQUÍ
        return (speed * delta) / 1000;
    };


    function Ball(x, y, angle, v, diameter, sticky) {
        // TU CÓDIGO AQUÍ
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.v = v;
        this.diameter = diameter;
        this.sticky = sticky;

        this.draw = function (ctx) {

            // TU CÓDIGO AQUÍ
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "green";
            ctx.fill();
        };

        this.move = function (x, y) {
            // TU CÓDIGO AQUÍ
            if (x != undefined && y != undefined) {
                this.x = x;
                this.y = y;
            }
            else {
                var incX = this.v * Math.cos(this.angle);
                var incY = this.v * Math.sin(this.angle);
                this.x += calcDistanceToMove(delta, incX);
                if (this.y > 0) {
                    this.y -= calcDistanceToMove(delta, incY);
                }
            }
        };

    }

    // Inits
    window.onload = function init() {
        var game = new GF();
        game.start();
    };


    // GAME FRAMEWORK STARTS HERE
    var GF = function () {

        // vars for counting frames/s, used by the measureFPS function
        var frameCount = 0;
        var lastTime;
        var fpsContainer;
        var fps, oldTime = 0;

        //  var speed = 300; // px/s 
        //  var vausWidth = 30,   vausHeight = 10;

        var balls = [];
        var bricks = [];
        var bricksLeft;

        var lifes = 1;

        // vars for handling inputs
        var inputStates = {};

        // game states
        var gameStates = {
            // TU CÓDIGO AQUÍ
            gameRunning: "Running",
            gameOver: "Over"
        };

        //  var currentGameState =  ;    // TU CÓDIGO AQUÍ
        var currentGameState = gameStates.gameRunning;

        // VAUS en objeto literal 
        var paddle = {
            dead: false,
            x: 10,
            y: 130,
            width: 32,
            height: 8,
            speed: 300, // pixels/s 
            sticky: false,
            sprite: new Sprite('img/sprites.png', [224,40], [32,8], 16, [0,1])
        };



        var ladrillos = [
            // grey
            {
                x: 20,
                y: 20,
                c: 'grey'
            }, {
                x: (20 * 2 + ANCHURA_LADRILLO),
                y: 20,
                c: 'grey'
            }, {
                x: 20 * 3 + ANCHURA_LADRILLO * 2,
                y: 20,
                c: 'grey'
            }, {
                x: 20 * 4 + ANCHURA_LADRILLO * 3,
                y: 20,
                c: 'grey'
            }, {
                x: 20 * 5 + ANCHURA_LADRILLO * 4,
                y: 20,
                c: 'grey'
            },
            // red
            {
                x: 20,
                y: 42,
                c: 'red'
            }, {
                x: 20 * 2 + ANCHURA_LADRILLO,
                y: 42,
                c: 'red'
            }, {
                x: 20 * 3 + ANCHURA_LADRILLO * 2,
                y: 42,
                c: 'red'
            }, {
                x: 20 * 4 + ANCHURA_LADRILLO * 3,
                y: 42,
                c: 'red'
            }, {
                x: 20 * 5 + ANCHURA_LADRILLO * 4,
                y: 42,
                c: 'red'
            }
        ];



        var createBricks = function () {
            // TU CÓDIGO AQUÍ
            for (let i = 0; i < ladrillos.length; i++) {
                var ladrillo = ladrillos[i];
                bricks.push(new Brick(ladrillo.x, ladrillo.y, ladrillo.c));
            }
        }

        var drawBricks = function () {
            // TU CÓDIGO AQUÍ
            for (let i = 0; i < bricks.length; i++) {
                bricks[i].draw(ctx);
            }
        };

        var measureFPS = function (newTime) {

            // test for the very first invocation
            if (lastTime === undefined) {
                lastTime = newTime;
                return;
            }

            //calculate the difference between last & current frame
            var diffTime = newTime - lastTime;

            if (diffTime >= 1000) {

                fps = frameCount;
                frameCount = 0;
                lastTime = newTime;
            }

            //and display it in an element we appended to the 
            // document in the start() function
            fpsContainer.innerHTML = 'FPS: ' + fps;
            frameCount++;
        };

        // clears the canvas content
        function clearCanvas() {
            ctx.clearRect(0, 0, w, h);
            // ctx.fillStyle = 'green';
            // ctx.fillRect(15,15,4,4);    
        }


        function testBrickCollision(ball) {
            // TU CÓDIGO AQUÍ
            for (let i = 0; i < bricks.length; i++) {
                let colision = intersects(bricks[i].x, bricks[i].y, bricks[i].x + ANCHURA_LADRILLO, bricks[i].y + ALTURA_LADRILLO, ball.x, ball.y, ball.diameter / 2)
                if (colision.c) {
                    if (colision.d == 'left') {
                        ball.angle = -ball.angle + Math.PI;
                        ball.x = bricks[i].x - ball.diameter / 2;
                    }
                    else if (colision.d == 'right') {
                        ball.angle = -ball.angle + Math.PI;
                        ball.x = bricks[i].x + ANCHURA_LADRILLO + ball.diameter / 2;
                    }
                    else if (colision.d == 'top') {
                        ball.angle = -ball.angle;
                        ball.y = bricks[i].y - ball.diameter / 2;
                    }
                    else if (colision.d == 'bottom') {
                        ball.angle = -ball.angle;
                        ball.y = bricks[i].y + ALTURA_LADRILLO + ball.diameter / 2;
                    }

                    bricks.splice(i, 1);
                    ball.v = ball.v * 2;
                }
            }

            return bricks.length;
        }



        // Función para pintar la raqueta Vaus
        function drawVaus(x, y) {

            // TU CÓDIGO AQUÍ
            ctx.beginPath();
            ctx.moveTo(paddle.x, paddle.y);
            ctx.lineTo(paddle.x, paddle.y + paddle.height);
            ctx.lineTo(paddle.x + paddle.width, paddle.y + paddle.height);
            ctx.lineTo(paddle.x + paddle.width, paddle.y);
            ctx.closePath();

            ctx.stroke();
        }

        function displayLifes() {
            // TU CÓDIGO AQUÍ
            ctx.fillStyle = "red";
            ctx.fillText("Lifes: " + lifes, 195, 10);
        }

        var updatePaddlePosition = function () {


            var incX = Math.ceil(calcDistanceToMove(delta, paddle.speed));
            // TU CÓDIGO AQUÍ
            if (paddle.x + incX + paddle.width < w && inputStates.right) {
                paddle.x = paddle.x + incX;
            }
            else if (paddle.x - incX > 0 && inputStates.left) {
                paddle.x = paddle.x - incX;
            }
            else if (inputStates.space) {
                console.log("Disparo");
            }
        }


        function updateBalls() {
            for (var i = balls.length - 1; i >= 0; i--) {
                var ball = balls[i];
                ball.move();

                var die = testCollisionWithWalls(ball, w, h);

                // TU CÓDIGO AQUÍ
                // Nuevo: gestiona la pérdida de una bola usando los atributos de paddle
                if (die) {
                    paddle.dead = true;
                    balls.pop();
                    if (balls.length <= 0) {
                        lifes--;
                    }
                }

                // NUEVO
                // test if ball collides with any brick
                bricksLeft = testBrickCollision(ball);

                // TU CÓDIGO AQUÍ
                // Test if the paddle collides
                // NUEVO: Gestiona el rebote de la bola con Vaus usando los atributos de paddle
                var collision = circRectsOverlap(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.diameter / 2);

                if (collision) {
                    ball.angle = -ball.angle;
                    ball.y = paddle.y - ball.diameter / 2;
                }

                ball.draw(ctx);
            }
        }

        function timer(currentTime) {
            var aux = currentTime - oldTime;
            oldTime = currentTime;
            return aux;

        }

        function inicializarGestorTeclado() {
            document.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case "ArrowLeft":
                        inputStates.left = true;
                        break;
                    case "ArrowRight":
                        inputStates.right = true;
                        break;
                    case " ":
                        inputStates.space = true;
                        break;
                }
                event.preventDefault();
                event.stopPropagation();
            });

            document.addEventListener('keyup', function (event) {
                switch (event.key) {
                    case "ArrowLeft":
                        inputStates.left = false;
                        break;
                    case "ArrowRight":
                        inputStates.right = false;
                        break;
                    case " ":
                        inputStates.space = false;
                        break;
                }
                event.preventDefault();
                event.stopPropagation();
            });
        }


        var mainLoop = function (time) {
            //main function, called each frame 
            measureFPS(time);

            // number of ms since last frame draw
            delta = timer(time);

            // Clear the canvas
            clearCanvas();

            // TU CÓDIGO AQUÍ
            // NUEVO
            // Si se ha perdido una vida, comprobar si quedan más 
            // si no --> Game Over
            // si quedan más --> sacar una nueva bola (y actualizar el atributo paddle.dead)
            if (paddle.dead) {
                if (lifes <= 0) {
                    currentGameState = gameStates.gameOver;
                }
                else {
                    var bola = new Ball(10, 70, Math.PI / 3, 10, 12, false);
                    balls.push(bola);
                    paddle.dead = false;
                }
            }

            // TU CÓDIGO AQUÍ
            // SI currentGameState = en ejecución
            // todo sigue como antes: 
            if (currentGameState == gameStates.gameRunning) {
                // Mover Vaus de izquierda a derecha
                updatePaddlePosition();

                updateBalls();

                // draw Vaus
                drawVaus(paddle.x, paddle.y);

                // dibujar ladrillos
                drawBricks();

                displayLifes();

                // call the animation loop every 1/60th of second
                requestAnimationFrame(mainLoop);
            }


            // PERO Si currentGameState = GAME OVER
            // PINTAR la pantalla de negro y escribir GAME OVER    
            else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, w, h);

                ctx.fillStyle = "white";
                ctx.fillText("Game Over", w / 2 - 25, h / 2);
            }
        };

        function init() {
            startNewGame();
            // comenzar la animación
            requestAnimationFrame(mainLoop);
        }

        function startNewGame() {
            balls.push(new Ball(10, 70, Math.PI / 3, 100, 6, false));
            createBricks();
        }

        var start = function () {
            // capa div para visualizar los fps
            fpsContainer = document.createElement('div');
            document.body.appendChild(fpsContainer);

            inicializarGestorTeclado();
            resources.load([
                'img/sprites.png'
            ]);
            resources.onReady(init);
        };

        //our GameFramework returns a public API visible from outside its scope
        return {
            start: start
        };
    };


    var game = new GF();
    game.start();
}

window.onload = inicializarJuego;