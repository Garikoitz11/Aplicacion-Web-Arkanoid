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
La aplicación está desarrollada en JavaScript y consiste en romper bloques rectangulares que aparecen en la parte superior de la pantalla.

El jugador dispone de 3 vidas, las cuales se restarán a medida que el jugador falle al golpear la bola y esta caiga. Si se golpea la raqueta inferior, la bola rebotará con la intención de chocar contra algún bloque y destruirlo. La raqueta inferior solo se mueve horizontalmente, no verticalmente.

A lo largo de la partida, aparecerán bonus en posiciones y momentos aleatorios.

A medida que se rompen los bloques, la velocidad de la bola aumentará para dificultar la victoria del jugador.

El juego consta de 3 niveles diferentes, que se desbloquearán a medida que el jugador avance de fase. Durante la partida, se acumularán puntos según los bloques que se rompan. Por ejemplo, en el nivel 1, cada bloque roto sumará 10 puntos a la puntuación final; en el nivel 2, cada bloque roto sumará 20 puntos; y en el nivel 3, cada bloque roto sumará 30 puntos. Además, se mostrará constantemente la puntuación, las vidas restantes y el nivel actual.

Una vez que se hayan superado los 3 niveles, se mostrará una interfaz de victoria. En caso contrario, aparecerá una interfaz de Game Over. Ambas interfaces mostrarán los puntos obtenidos en esa partida.
