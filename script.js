// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx=canvas.getContext("2d");
var w = canvas.width;
var h= canvas.height;

// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};


// GAME FRAMEWORK 
var GF = function(){

 // variables para contar frames/s, usadas por measureFPS
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps; 
  
    var measureFPS = function(newTime){
   // la primera ejecución tiene una condición especial
   
         if(lastTime === undefined) {
           lastTime = newTime; 
           return;
         }
      
 // calcular el delta entre el frame actual y el anterior
        var diffTime = newTime - lastTime; 

        if (diffTime >= 1000) {

            fps = frameCount;    
            frameCount = 0;
            lastTime = newTime;
        }

   // mostrar los FPS en una capa del documento
   // que hemos construído en la función start()
       fpsContainer.innerHTML = 'FPS: ' + fps; 
       frameCount++;
    };
  
     // clears the canvas content
     function clearCanvas() {
       ctx.clearRect(0, 0, w, h);
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
  
    var mainLoop = function(time){
        //main function, called each frame 
        measureFPS(time);

        // Clear the canvas
        clearCanvas();
        
        // draw the monster
        drawVaus(10, 135);
      
        // call the animation loop every 1/60th of second
        requestAnimationFrame(mainLoop);
    };

    var start = function(){
        // adds a div for displaying the fps value
        fpsContainer = document.createElement('div');
        document.body.appendChild(fpsContainer);
        
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


test('Testeando colores', function(assert) {  
   // canvas, x,y, r,g,b, a, mezua
   
   assert.pixelEqual( canvas, 10,135, 0,0,0,255,"Passed!");  

});