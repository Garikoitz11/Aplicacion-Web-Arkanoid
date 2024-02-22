# ARKANOID - Aplicación web
## Descripción
Proyecto realizado para la asignatura Desarrollo de Aplicaciones Web Enriquecidas. Es una aplicación web en la que puedes jugar al clásico juego Arkanoid.
## Requisitos
- Navegador web.
- Un servidor.
## Ejecución
- Clonar el repositorio en el equipo: ```$ git clone <URL del repositorio> ```
- Desplegar la aplicación en un servidor web como por ejemplo Apache. Opcionalmente, utilizando VS Code es posible descargarse la extensión Live Server y abriendo el directorio del repositorio en VS Code darle al botón Go Live para su despliegue.
## Funcionamiento
La aplicación está desarrollada en HTML, CSS y mayoritariamente JavaScript y consiste en romper bloques rectangulares que aparecen en la parte superior de la pantalla con una bola que es golpeada por una raqueta controlada por el usuario.

El jugador dispone de 3 vidas, las cuales se restarán a medida que el jugador falle al golpear la bola y esta caiga al vacío. Si se golpea la raqueta inferior con la bola, esta última rebotará destruyendo cualquier bloque que se encuentre por el camino. La raqueta inferior se mueve horizontalmente, no verticalmente.

Para iniciar el juego, el jugador deberá desplazar la raqueta con las flechas de dirección para lanzar la bola y esta se despegará de la raqueta una vez el usuario deje de presionar las flechas de dirección. Lo mismo ocurre al perder una vida o pasar de nivel.

A lo largo de la partida, aparecerán bonus en posiciones y momentos aleatorios, pero estos no aportan nada.

A medida que se rompen los bloques, la velocidad de la bola aumentará para dificultar la victoria del jugador. Sin embargo, cada vez que se pasa de nivel esta bola vuelve a la velocidad de incio.

El juego consta de 3 niveles diferentes, que se desbloquearán a medida que el jugador avance de fase. Durante la partida, se acumularán puntos según los bloques que se rompan. Por ejemplo, en el nivel 1, cada bloque roto sumará 10 puntos a la puntuación final; en el nivel 2, cada bloque roto sumará 20 puntos; y en el nivel 3, cada bloque roto sumará 30 puntos. Además, se mostrará constantemente la puntuación, las vidas restantes y el nivel actual en la parte superior de la pantalla.

Una vez que se hayan superado los 3 niveles, se mostrará una interfaz gráfica de victoria. En caso contrario, aparecerá una interfaz gráfica de Game Over. Ambas interfaces mostrarán los puntos obtenidos en esa partida.
## Datos de interés
- En caso de no conseguir destruir un bloque intentar darle con efecto a la bola. (Cuando la raqueta toque la bola esta primera debe estar en movimiento)
- En caso de ver que es muy difícil atravesar el nivel es posible hacerlo más sencillo bajando el valor de la variable **incrementSpeedBall**.
- Es necesario que el usuario interactue con el navegador para que suenen los efectos de sonido.
## Demo
Es posible probar la aplicación web accediendo a la siguiente dirección: https://garikoitz11.github.io/Aplicacion-Web-Arkanoid/
