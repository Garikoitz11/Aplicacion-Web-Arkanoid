// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx=canvas.getContext("2d");
var w = canvas.width;
var h= canvas.height;

// Game Framework
var GF = function(){
  
   var mainLoop = function(time){
    // TU CÓDIGO AQUÍ
    let posicionX = Math.floor(Math.random() * 140) + 5;
    let posicionY = Math.floor(Math.random() * 140) + 5;

    ctx.beginPath();
    ctx.arc(posicionX, posicionY, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "red";
		ctx.fill();

    requestAnimationFrame(mainLoop);
  };
  var start = function(){
    requestAnimationFrame(mainLoop);
  };
  return {
    start: start
  };
};

var game = new GF();
game.start();


test('Testeando colores', function(assert) {  

    var done = assert.async();
    var rojos = 0;
   
  // ctx.fillStyle = 'red';
 //  ctx.fillRect(15,15,4,4);    

  setTimeout(function() {
         var colores = [];
         
         colores.push(
         Array.prototype.slice.apply(canvas.getContext("2d").getImageData(15, 15, 1, 1).data), Array.prototype.slice.apply(canvas.getContext("2d").getImageData(45, 45, 1, 1).data), Array.prototype.slice.apply(canvas.getContext("2d").getImageData(75, 75, 1, 1).data), Array.prototype.slice.apply(canvas.getContext("2d").getImageData(105, 105, 1, 1).data),
 Array.prototype.slice.apply(canvas.getContext("2d").getImageData(135, 135, 1, 1).data)
         );
         
   for(var i=0; i< colores.length; i++)
      if (colores[i][0] == 255)
            rojos++;
         
   assert.ok( rojos >= 1, "Passed!");  
    done();
  }, 10000 );
    
});