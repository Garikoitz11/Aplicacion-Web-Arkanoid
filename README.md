# ARKANOID - Aplicación web del juego Arkanoid
## Descripción
Proyecto realizado para la asignatura Desarrollo de Aplicaciones Web Enriquecidas. Es una aplicación web en el que puedes jugar al clásico juego del Arkanoid.
## Requisitos
- Tener un navegador con internet.
## Ejecución
- Clonar el repositorio en el equipo: ```$ git clone <URL del repositorio> ```
- Moverse dentro de la carpeta clonada: ```$ cd <nombre del repositorio>```
- Una vez que tengamos el proyecto clonado en nuestro editor de codigo fuente, lo ejecutamos mediante el comando live Server
## Funcionamiento
La aplicación está desarrollada en javaScrip, y consiste en romper bloques rectangulares que aparecen en la parte superior de la pantalla. 

El jugador dispone de 3 vidas, que se irán restando a medida que el jugador no le de correctamente a la bola y caiga. En caso de darle a la raqueta inferior la bola revotará con intención de chocar contra algún bloque y destruirlo, la raqueta inferior solo se moverá horizontalmente nunca verticalmente.

A medida que se van rompiendo los bloques la velocidad de la bola aumentará para dificultar al jugador de la victoria.

EL juego consta de 3 niveles diferentes, que se irán descubriendo siempre y cuando el jugador pase de fase, una vez se hayan ganado los 3 niveles se mostrará una interfaz de victoria, en cado contrario aparecera una de Game Over.
