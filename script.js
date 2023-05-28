// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var haciaDerecha = true;

var x = 10,
  y = 135;

// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};


// GAME FRAMEWORK 
var GF = function() {

  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps;

  var speed = -5; // posición de Vaus
  var vausWidth = 30,
    vausHeight = 10;

  var measureFPS = function(newTime) {

    if (lastTime === undefined) {
      lastTime = newTime;
      return;
    }

    var diffTime = newTime - lastTime;

    if (diffTime >= 1000) {

      fps = frameCount;
      frameCount = 0;
      lastTime = newTime;
    }
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
    ctx.lineTo(x,y+10);
    ctx.lineTo(x+30,y+10);
    ctx.lineTo(x+30,y);
    ctx.closePath(); 

    ctx.stroke();
  }

  var updatePaddlePosition = function() {
    // TU CÓDIGO AQUÍ
    // Fíjate que GF tiene definidas ya variables de interés
    // que tendrás que usar: x, y, speed, vausWidth, w
    if (x > 0  && !haciaDerecha) {
    	x--;
    }
    else if (x + vausWidth < w  && haciaDerecha) {
    	x++;
    }
    else {
    	haciaDerecha = !haciaDerecha
    }
    
}

  var mainLoop = function(time) {
    // funció principal, llamada en cada frame 
    measureFPS(time);

    // Borrar canvas
    clearCanvas();

    // Mover Vaus de izquierda a derecha
    updatePaddlePosition();

    // pintar Vaus
    drawVaus(x, y);

    // animation loop, llamado cada 1/60 segundos
    requestAnimationFrame(mainLoop);
  };

  var start = function() {
    // un div para mostrar los fps
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);

    // comenzar la animación
    requestAnimationFrame(mainLoop);
  };

  // API Público
  return {
    start: start
  };
};


var game = new GF();
game.start();


test('Testeando colores', function(assert) {
  // canvas, x,y, r,g,b, a, mensaje
  assert.pixelEqual(canvas, 10, 135, 0, 0, 0, 255, "Passed!");
});



test('Empieza moviéndose hacia la izquierda', function(assert) {
  var done = assert.async();
  setTimeout(function() {
    assert.ok(x <= 20, "Passed!");
    done();
  }, 100);

});

test('Rebota hacia la derecha', function(assert) {
  var done = assert.async();
  setTimeout(function() {
    assert.ok(x >= 20, "Passed!");
    done();
  }, 150);

});