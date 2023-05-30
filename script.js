// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;


var x = 130,
  y = 135;

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
  var fps, delta, oldTime = 0;

  var speed = 300; // px/s 
  var vausWidth = 30, vausHeight = 10;

    // vars for handling inputs
    var inputStates = {};


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

  
  var calcDistanceToMove = function(delta, speed) {
// TU CÓDIGO AQUÍ
  	return (speed * delta) / 1000;
};

  var updatePaddlePosition = function() {
    
     var incX = Math.ceil(calcDistanceToMove(delta, speed));

          // check inputStates
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

 function timer(currentTime) {
    var aux = currentTime - oldTime;
    oldTime = currentTime;
    return aux;
    
  }
    var mainLoop = function(time){
        //main function, called each frame 
        measureFPS(time);
      
        // number of ms since last frame draw
        delta = timer(time);

    // Clear the canvas
    clearCanvas();

    // Mover Vaus de izquierda a derecha
    updatePaddlePosition();

    // draw Vaus
    drawVaus(x, y);

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
		})

    // start the animation
    requestAnimationFrame(mainLoop);
  };

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start
  };
};


var game = new GF();
game.start();