# ARKANOID - Aplicación web del juego Arkanoid
## Descripción
Proyecto realizado para la asignatura Desarrollo de Aplicaciones Web Enriquecidas. Es una aplicación web en el que puedes jugar al clásico juego del Arkanoid.
## Requisitos
- Tener un navegador con internet.
## Ejecución
- Clonar el repositorio en el equipo: ```$ git clone <URL del repositorio> ```
- Moverse dentro de la carpeta clonada: ```$ cd <nombre del repositorio>```
- Una vez que tengamos el proyecto clonado en nuestro editor de codigo fuente, lo ejecutamos mediante el comando ```live Server```
## Funcionamiento
La aplicación está desarrollada en javaScrip, y consiste en romper bloques rectangulares que aparecen en la parte superior de la pantalla. 

El jugador dispone de 3 vidas, que se irán restando a medida que el jugador no le de correctamente a la bola y caiga. En caso de darle a la raqueta inferior la bola revotará con intención de chocar contra algún bloque y destruirlo, la raqueta inferior solo se moverá horizontalmente nunca verticalmente.

A medida que se van rompiendo los bloques, la velocidad de la bola aumentará para dificultar al jugador la victoria.

EL juego consta de 3 niveles diferentes, que se irán descubriendo siempre y cuando el jugador pase de fase, una vez se hayan ganado los 3 niveles se mostrará una interfaz de victoria, en cado contrario aparecera una de Game Over.

Durante la partida se irán sumando puntos, esos puntos se conseguirán segun los bloques que rompas; por ejemplo por cada bloque que rompas en el nivel 1, se sumarán 10 puntos a tu puntuación final, en caso de estar en el nivel 2 cada bloque que se rompa sumará 20 puntos y por ultimo en el nivel 3 sumará 30 puntos cada bloque, hay que mencionar, que durante toda la partida se visualizará tanto los puntos conseguidos, las vidas que tienes y en el nivel que estas.

A lo largo de la partida irán cayendo bonus en posiciones y momentos aleatorios.
