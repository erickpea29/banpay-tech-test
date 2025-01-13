Studio Ghibli Movies App
========================

Una aplicación sencilla que lista y permite buscar películas del Studio Ghibli utilizando su API pública. La interfaz está diseñada para ser clara, estética y funcional, alineada con los principios de un producto listo para producción.

Tecnologías utilizadas
----------------------

-   **Next.js**: Framework de React para renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG).
-   **React**: Biblioteca para construir interfaces de usuario interactivas.
-   **Tailwind CSS**: Framework de estilos para diseño rápido y personalizable.

* * * * *

Características principales
---------------------------

-   Listado de películas con datos obtenidos desde la Studio Ghibli API (https://ghibliapi.herokuapp.com/).
-   Buscador con soporte para autocompletado.
-   Detalle básico de cada película.
-   Interfaz limpia y agradable a la vista, con un diseño responsivo.

* * * * *

Requisitos previos
------------------

Asegúrate de tener instalados los siguientes elementos en tu sistema:

-   **Node.js**: Versión 16 o superior.
-   **npm** o **yarn**: Para instalar dependencias y ejecutar el proyecto.

* * * * *

Instrucciones para desplegar el proyecto
----------------------------------------

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio**:
    `git clone https://github.com/tu-usuario/studio-ghibli-app.git
    cd studio-ghibli-app`

2.  **Instalar las dependencias**:\
    Si utilizas npm:

    `npm install`

    O si prefieres yarn:

    `yarn`

3.  **Iniciar el servidor de desarrollo**:\
    Si utilizas npm:

    `npm run dev`

    O si prefieres yarn:

    `yarn dev`

4.  **Abrir en el navegador**:\
    Ve a <http://localhost:3000> para ver la aplicación en funcionamiento.

* * * * *

Cómo llevarlo a otro nivel
--------------------------

Si este proyecto fuera un producto real, estas son algunas ideas de mejoras y cuánto tiempo podría tomar desarrollarlas:

1.  **Ampliación de la API**

    -   Si la API proporcionara más información, se podrían consumir datos como:
        -   **Directores**: Crear páginas dedicadas para cada director.
        -   **Guionistas**: Mostrar los detalles de los escritores detrás de las películas.
        -   **Colaboradores**: Agregar información de otros miembros del equipo creativo.
    -   Tiempo estimado: 1-2 semanas (dependiendo del diseño y las funcionalidades adicionales).
2.  **Interactividad para el usuario**

    -   Crear una sección de comentarios para que los usuarios puedan compartir sus opiniones sobre las películas.
    -   Implementar un sistema de ranking para que los usuarios puedan calificar sus películas favoritas con un sistema de estrellas.
    -   Tiempo estimado: 2-3 semanas.
3.  **Optimización y escalabilidad**

    -   Implementar carga perezosa (lazy loading) para mejorar el rendimiento cuando se muestran muchas películas.
    -   Mejorar la experiencia de usuario con animaciones suaves y transiciones.
4.  **Optimización para dispositivos móviles**

    -   Asegurarse de que la aplicación sea completamente responsiva y fácil de usar en cualquier dispositivo.
