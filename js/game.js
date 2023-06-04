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
    var introMusic = false;
    var soundEffects = false;

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
            ctx.fillStyle = "white";
            ctx.fill();
        };

        this.move = function (x, y) {
            // TU CÓDIGO AQUÍ
            if (x != undefined && y != undefined) {
                this.x = x;
                this.y = y;
            }
            else if (!this.sticky) {
                var incX = this.v * Math.cos(this.angle);
                var incY = this.v * Math.sin(this.angle);
                this.x += calcDistanceToMove(delta, incX);
                if (this.y > 0) {
                    this.y -= calcDistanceToMove(delta, incY);
                }
            }
            else {
            }
        };

    }

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

        var lifes = 3;

        var level = 1;

        var score = 0;

        // vars for handling inputs
        var inputStates = {};

        // game states
        var gameStates = {
            // TU CÓDIGO AQUÍ
            gameRunning: "Running",
            gameOver: "Over",
            gameWinner: "Winner"
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
            sprite: new Sprite('img/sprites.png', [224, 40], [32, 8], 16, [0, 1])
        };



        var ladrillos = [
            // grey
            [
                {
                    x: 20,
                    y: 20,
                    c: 'red'
                }, {
                    x: (20 * 2 + ANCHURA_LADRILLO),
                    y: 20,
                    c: 'red'
                }, {
                    x: 20 * 3 + ANCHURA_LADRILLO * 2,
                    y: 20,
                    c: 'red'
                }, {
                    x: 20 * 4 + ANCHURA_LADRILLO * 3,
                    y: 20,
                    c: 'red'
                }, {
                    x: 20 * 5 + ANCHURA_LADRILLO * 4,
                    y: 20,
                    c: 'red'
                },
                // red
                {
                    x: 20,
                    y: 42,
                    c: 'orange'
                }, {
                    x: 20 * 2 + ANCHURA_LADRILLO,
                    y: 42,
                    c: 'orange'
                }, {
                    x: 20 * 3 + ANCHURA_LADRILLO * 2,
                    y: 42,
                    c: 'orange'
                }, {
                    x: 20 * 4 + ANCHURA_LADRILLO * 3,
                    y: 42,
                    c: 'orange'
                }, {
                    x: 20 * 5 + ANCHURA_LADRILLO * 4,
                    y: 42,
                    c: 'orange'
                }
            ],
            [
                {
                    x: 11,
                    y: 15,
                    c: 'darkBlue'
                }, {
                    x: (11 * 2 + ANCHURA_LADRILLO),
                    y: 15,
                    c: 'darkBlue'
                }, {
                    x: 11 * 3 + ANCHURA_LADRILLO * 2,
                    y: 15,
                    c: 'darkBlue'
                }, {
                    x: 11 * 4 + ANCHURA_LADRILLO * 3,
                    y: 15,
                    c: 'darkBlue'
                }, {
                    x: 11 * 5 + ANCHURA_LADRILLO * 4,
                    y: 15,
                    c: 'darkBlue'
                }, {
                    x: 11 * 6 + ANCHURA_LADRILLO * 5,
                    y: 15,
                    c: 'darkBlue'
                }, {
                    x: 11 * 7 + ANCHURA_LADRILLO * 6,
                    y: 15,
                    c: 'darkBlue'
                },

                {
                    x: 15.5,
                    y: 30,
                    c: 'blue'
                }, {
                    x: (15.5 * 2 + ANCHURA_LADRILLO),
                    y: 30,
                    c: 'blue'
                }, {
                    x: 15.5 * 3 + ANCHURA_LADRILLO * 2,
                    y: 30,
                    c: 'blue'
                }, {
                    x: 15.5 * 4 + ANCHURA_LADRILLO * 3,
                    y: 30,
                    c: 'blue'
                }, {
                    x: 15.5 * 5 + ANCHURA_LADRILLO * 4,
                    y: 30,
                    c: 'blue'
                }, {
                    x: 15.5 * 6 + ANCHURA_LADRILLO * 5,
                    y: 30,
                    c: 'blue'
                },

                {
                    x: 11,
                    y: 45,
                    c: 'darkBlue'
                }, {
                    x: (11 * 2 + ANCHURA_LADRILLO),
                    y: 45,
                    c: 'darkBlue'
                }, {
                    x: 11 * 3 + ANCHURA_LADRILLO * 2,
                    y: 45,
                    c: 'darkBlue'
                }, {
                    x: 11 * 4 + ANCHURA_LADRILLO * 3,
                    y: 45,
                    c: 'darkBlue'
                }, {
                    x: 11 * 5 + ANCHURA_LADRILLO * 4,
                    y: 45,
                    c: 'darkBlue'
                }, {
                    x: 11 * 6 + ANCHURA_LADRILLO * 5,
                    y: 45,
                    c: 'darkBlue'
                }, {
                    x: 11 * 7 + ANCHURA_LADRILLO * 6,
                    y: 45,
                    c: 'darkBlue'
                }
            ],

            [
                {
                    x: 5,
                    y: 15,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO,
                    y: 15,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 2,
                    y: 15,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 3,
                    y: 15,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 4,
                    y: 15,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 5,
                    y: 15,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 6,
                    y: 15,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 7,
                    y: 15,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 8,
                    y: 15,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 9,
                    y: 15,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 10,
                    y: 15,
                    c: 'yellow'
                },

                {
                    x: 5,
                    y: 25,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO,
                    y: 25,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 2,
                    y: 25,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 3,
                    y: 25,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 4,
                    y: 25,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 5,
                    y: 25,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 6,
                    y: 25,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 7,
                    y: 25,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 8,
                    y: 25,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 9,
                    y: 25,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 10,
                    y: 25,
                    c: 'grey'
                },

                {
                    x: 5,
                    y: 35,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO,
                    y: 35,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 2,
                    y: 35,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 3,
                    y: 35,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 4,
                    y: 35,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 5,
                    y: 35,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 6,
                    y: 35,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 7,
                    y: 35,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 8,
                    y: 35,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 9,
                    y: 35,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 10,
                    y: 35,
                    c: 'yellow'
                },

                {
                    x: 5,
                    y: 45,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO,
                    y: 45,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 2,
                    y: 45,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 3,
                    y: 45,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 4,
                    y: 45,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 5,
                    y: 45,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 6,
                    y: 45,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 7,
                    y: 45,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 8,
                    y: 45,
                    c: 'grey'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 9,
                    y: 45,
                    c: 'yellow'
                }, {
                    x: 5 + ANCHURA_LADRILLO * 10,
                    y: 45,
                    c: 'grey'
                },
            ]
        ];

        terrains = {
            1: [0, 80],
            2: [48, 80],
            3: [144, 80]
        }

        terrainsSize = {
            small: [24, 32],
            normal: [32, 32],
        }

        var initialSpeedBall = 100;
        var incrementSpeedBall = 7;
        var currentSpeedBall = initialSpeedBall;

        var bonuses = []; // declarar e inicializar a vacío un array de bonus al comienzo de GF


        var createBricks = function () {
            // TU CÓDIGO AQUÍ
            for (let i = 0; i < ladrillos[level - 1].length; i++) {
                var ladrillo = ladrillos[level - 1][i];
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
            ctx.fillStyle = terrainPattern;
            ctx.fillRect(0, 0, w, h);

            // ctx.fillStyle = 'green';
            // ctx.fillRect(15,15,4,4);    
        }


        function testBrickCollision(ball) {
            // TU CÓDIGO AQUÍ
            for (let i = 0; i < bricks.length; i++) {
                let colision = intersects(bricks[i].x, bricks[i].y, bricks[i].x + ANCHURA_LADRILLO, bricks[i].y + ALTURA_LADRILLO, ball.x, ball.y, ball.diameter / 2)
                if (colision.c) {
                    sound.play('point');
                    score += 10 * level
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
                    ball.v = ball.v + incrementSpeedBall;
                    currentSpeedBall = ball.v;
                }
            }

            return bricks.length;
        }



        // Función para pintar la raqueta Vaus
        function drawVaus(x, y) {

            // TU CÓDIGO AQUÍ
            ctx.save();
            ctx.translate(x, y);
            paddle.sprite.render(ctx);
            ctx.restore();
        }

        function displayLifes() {
            // TU CÓDIGO AQUÍ
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.fillText("Lifes: " + lifes, 130, 10);
        }

        function displayLevel() {
            // TU CÓDIGO AQUÍ
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.fillText("Level: " + level, 185, 10);
        }

        function displayScore() {
            // TU CÓDIGO AQUÍ
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.fillText("Score: " + score, 5, 10);
        }

        var updatePaddlePosition = function () {

            paddle.sprite.update(delta);

            var incX = Math.ceil(calcDistanceToMove(delta, paddle.speed));
            // TU CÓDIGO AQUÍ
            if (paddle.x + incX + paddle.width < w && inputStates.right) {
                paddle.x = paddle.x + incX;
                if (balls[0].sticky) {
                    balls[0].x = paddle.x + paddle.width/2
                }
            }
            else if (paddle.x - incX > 0 && inputStates.left) {
                paddle.x = paddle.x - incX;
                if (balls[0].sticky) {
                    balls[0].x = paddle.x + paddle.width/2
                }
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
                if (bricksLeft <= 0) {
                    level++;
                    if (level == 2) {
                        ball.v = initialSpeedBall;
                        initTerrain(terrains["2"], terrainsSize["normal"]);
                        createBricks();
                    }
                    else if (level == 3) {
                        ball.v = initialSpeedBall;
                        initTerrain(terrains["3"], terrainsSize["normal"]);
                        createBricks();
                    }
                    else if (level > 3) {
                        currentGameState = gameStates.gameWinner;
                    }
                }

                // TU CÓDIGO AQUÍ
                // Test if the paddle collides
                // NUEVO: Gestiona el rebote de la bola con Vaus usando los atributos de paddle
                var collision = circRectsOverlap(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.diameter / 2);

                if (collision) {
                    sound.play('rebote');

                    if (inputStates.right)
                        ball.angle = ball.angle * (ball.angle < 0 ? 0.5 : 1.5);
                    else if (inputStates.left)
                        ball.angle = ball.angle * (ball.angle > 0 ? 0.5 : 1.5);
                    else {
                        ball.angle = -ball.angle;
                    }

                    ball.y = paddle.y - ball.diameter / 2;
                }

                ball.draw(ctx);
            }
        }

        function updateBonus() {
            for (let i = 0; i < bonuses.length; i++) {
                bonuses[i].move(delta, calcDistanceToMove);
                bonuses[i].draw(ctx);
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
                        if (balls[0].sticky) {
                            balls[0].sticky = !balls[0].sticky;
                        }
                        inputStates.left = false;
                        break;
                    case "ArrowRight":
                        if (balls[0].sticky) {
                            balls[0].sticky = !balls[0].sticky;
                        }
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
                    sound.play('vidaPerdida');
                    var bola = new Ball(paddle.x + paddle.width/2, paddle.y - 3, Math.PI / 3, currentSpeedBall, 6, true);
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
                displayLevel();
                displayScore();

                updateBonus();

                // call the animation loop every 1/60th of second
                requestAnimationFrame(mainLoop);
            }


            // PERO Si currentGameState = GAME OVER
            // PINTAR la pantalla de negro y escribir GAME OVER    
            else if (currentGameState == gameStates.gameOver) {
                sound.play('perder')
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, w, h);

                ctx.fillStyle = "white";
                ctx.fillText("Game Over", w / 2 - 25, h / 2);
            }
            else {
                sound.play('winner');

                ctx.fillStyle = "gold";
                ctx.fillRect(0, 0, w, h);

                ctx.fillStyle = "black";
                ctx.fillText("WINNER!!!!", w / 2 - 25, h / 2);
            }
        };

        function loadAssets(callback) {
            // Cargar sonido asíncronamente usando howler.js
            music = new Howl({
                urls: ['assets/Game_Start.ogg'],
                volume: 1,
                onload: function () {
                    introMusic = true;
                    if (introMusic && soundEffects) {
                        callback();
                    }
                }
            }); // new Howl

            sound = new Howl({
                urls: ['/assets/sounds.mp3'],
                volume: 1,
                sprite: {
                    point: [0, 700],
                    rebote: [11200, 500],
                    winner: [22000, 2000],
                    perder: [2800, 1200],
                    vidaPerdida: [15200, 500]
                },
                onload: function () {
                    soundEffects = true;
                    if (introMusic && soundEffects) {
                        callback();
                    }
                }
            });

        }

        function initTerrain(number, size) {
            terrain = new Sprite('img/sprites.png', number, size);
            terrainPattern = ctx.createPattern(terrain.image(), 'repeat');  // repeat forma un mosaico con el fondo
        }

        function init() {
            loadAssets(archivoCargado);
        }

        function archivoCargado() {
            music.play();
            startNewGame();
            // comenzar la animación
            requestAnimationFrame(mainLoop);
        }

        function startNewGame() {
            initTerrain(terrains["1"], terrainsSize["small"]);
            balls.push(new Ball(paddle.x + paddle.width/2, paddle.y - 3, Math.PI / 3, initialSpeedBall, 6, true));
            createBricks();
            bonuses.push(new Bonus()); // incluir esta línea a la función startNewGame()
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