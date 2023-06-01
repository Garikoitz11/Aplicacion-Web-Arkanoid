// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var x = 130,
  y = 135; // posición inicial de Vaus
var delta;
var ANCHURA_LADRILLO = 20,
  ALTURA_LADRILLO = 10;

// var frames = 30;

function intersects(left, up, right, bottom, cx, cy, radius )
{
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

   return result = { c : ( dx * dx + dy * dy ) <= radius * radius, d : side  };
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
   	if (ball.x + ball.diameter/2 > w) {
       ball.angle = -ball.angle + Math.PI;
       ball.x = w - ball.diameter/2
       return false;
     }
    if (ball.x < ball.diameter/2) {
      ball.angle = -ball.angle + Math.PI;
      ball.x = ball.diameter/2
      return false;
    }
    if (ball.y < ball.diameter/2) {
      ball.angle = -ball.angle;
      ball.y = ball.diameter/2;
      return false;
    }
    if (ball.y + ball.diameter/2 > h) {
      ball.angle = -ball.angle;
      ball.y = h - ball.diameter/2;
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
  draw: function(ctx) {
   // TU CÓDIGO AQUÍ
   	ctx.beginPath(); 
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y+ALTURA_LADRILLO);
    ctx.lineTo(this.x+ANCHURA_LADRILLO,this.y+ALTURA_LADRILLO);
    ctx.lineTo(this.x+ANCHURA_LADRILLO,this.y);
    ctx.closePath(); 

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
};


// función auxiliar
var calcDistanceToMove = function(delta, speed) {
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
    
  this.draw = function(ctx) {

   // TU CÓDIGO AQUÍ
		ctx.beginPath();
    ctx.arc(this.x, this.y, this.diameter/2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();
  };

  this.move = function(x, y) {
    // TU CÓDIGO AQUÍ
    if (x != undefined && y != undefined) {
    	this.x = x;
      this.y = y;
    }
    else {
      var incX = this.v * Math.cos(this.angle);
      var incY = this.v * Math.sin(this.angle);
      this.x += calcDistanceToMove(delta, incX);
      if(this.y > 0) {
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
var GF = function() {

  // vars for counting frames/s, used by the measureFPS function
  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps, oldTime = 0;

  var speed = 300; // px/s 
  var vausWidth = 30,
    vausHeight = 10;

  var balls = [];
  var bricks = [];
  var bricksLeft;

  // vars for handling inputs
  var inputStates = {};


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


  // TU CÓDIGO AQUÍ
  var createBricks = function() {
      // TU CÓDIGO AQUÍ
      // Crea el array de ladrillos
      // TU CÓDIGO AQUÍ
      // actualiza bricksLeft
      for (let i = 0; i < ladrillos.length; i++) {
    		var ladrillo = ladrillos[i];
    		bricks.push(new Brick(ladrillo.x, ladrillo.y, ladrillo.c));
  		}
    }

  var drawBricks = function() {
    // TU CÓDIGO AQUÍ
    for (let i = 0; i < bricks.length; i++) {
    	bricks[i].draw(ctx);
		}
  };

  var measureFPS = function(newTime) {

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
  // Para cada ladrillo
	 	 	// comprobar si hay intersección entre bola y ladrillo
 	 		// si la hay, incrementar la velocidad de la bola
 	 		// y rebotar la bola consecuentemente
 	 		// recuerda que ya has implementado un rebote de bola contra
 	 		// cualquiera de las paredes (left, right, top, bottom)
 	 		// por lo que un rebote contra un ladrillo es exactamente igual
 		  // En caso de colisión bola-ladrillo, elimina del array bricks
 	  	// el ladrillo correspondiente

   // devuelve el número de ladrillos que quedan
   	for (let i=0; i<bricks.length; i++) {
    	let colision = intersects(bricks[i].x, bricks[i].y, bricks[i].x + ANCHURA_LADRILLO, bricks[i].y + ALTURA_LADRILLO, ball.x, ball.y, ball.diameter/2)
    	if (colision.c) {
        if(colision.d == 'left') {
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
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+vausHeight);
    ctx.lineTo(x+vausWidth,y+vausHeight);
    ctx.lineTo(x+vausWidth,y);
    ctx.closePath(); 

    ctx.stroke();
  }


  var updatePaddlePosition = function() {


    var incX = Math.ceil(calcDistanceToMove(delta, speed));
 // TU CÓDIGO AQUÍ
 		if (x + incX + vausWidth < w  && inputStates.right) {
      x = x + incX;
    }
    else if (x - incX > 0  && inputStates.left) {
      x = x - incX;
    }
    else if (inputStates.space){
      console.log("Disparo");
     }
  }


  function updateBalls() {
    for (var i = balls.length - 1; i >= 0; i--) {
      var ball = balls[i];
      ball.move();

      var die = testCollisionWithWalls(ball, w, h);

      // NUEVO
      // test if ball collides with any brick
      bricksLeft = testBrickCollision(ball);

      // TU CÓDIGO AQUÍ
      // Test if the paddle collides
      var collision = circRectsOverlap(x, y, vausWidth, vausHeight, ball.x, ball.y, ball.diameter/2);

      if (collision) {
        ball.angle = -ball.angle;
        ball.y = y - ball.diameter/2;
      }

      ball.draw(ctx);
    }
  }

  function timer(currentTime) {
    var aux = currentTime - oldTime;
    oldTime = currentTime;
    return aux;

  }
  var mainLoop = function(time) {
    //main function, called each frame 
    measureFPS(time);

    // number of ms since last frame draw
    delta = timer(time);

    // Clear the canvas
    clearCanvas();

    // Mover Vaus de izquierda a derecha
    updatePaddlePosition();

    updateBalls();

    // draw Vaus
    drawVaus(x, y);

    // dibujar ladrillos
    drawBricks();
    // call the animation loop every 1/60th of second
    requestAnimationFrame(mainLoop);
  };

  var start = function() {
    // adds a div for displaying the fps value
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);

      // TU CÓDIGO AQUÍ
// Crea un listener para gestionar la pulsación
// de izquierda, derecha o espacio
// y actualiza inputStates.left .right o .space 
// el listener será para keydown (pulsar)
// y otro para keyup
		document.addEventListener('keydown', function(event) {
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
    
    document.addEventListener('keyup', function(event) {
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
  
// TU CÓDIGO AQUÍ
// Instancia una bola con los parámetros del enunciado e introdúcela en el array balls
		var bola = new Ball(10, 70, Math.PI/3, 10, 12, false);
   	balls.push(bola);
		
    createBricks();

    // start the animation
    requestAnimationFrame(mainLoop);
    
    test('Comprobar ladrillos', function(assert) {
      var done = assert.async();

// asumimos que tras 5 segundos rebotando la pelota ha roto al menos un ladrillo
   setTimeout(function() {
    assert.ok(bricksLeft <= 8, "Passed!");
    done();
  }, 5000);
});

    
  };

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start
  };
};


var game = new GF();
game.start();