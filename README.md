Studio Ghibli Movies App
========================

### Tecnologías utilizadas
----------------------

- **Next.js**: Framework de React que permite el renderizado del lado del servidor (SSR) y la generación de sitios estáticos (SSG), lo que mejora el rendimiento y la optimización para SEO. Es ideal para aplicaciones modernas y escalables.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables. Su enfoque basado en componentes facilita el desarrollo y mantenimiento de aplicaciones complejas.
- **Tailwind CSS**: Framework de diseño basado en utilidades que permite un desarrollo rápido y flexible. Facilita la personalización de los estilos sin necesidad de escribir CSS adicional.
- **Cypress**: Herramienta de pruebas end-to-end que permite automatizar pruebas en aplicaciones web. Se utiliza para asegurar que las funcionalidades de la app funcionen correctamente en diversos escenarios de usuario.
- **ESLint**: Herramienta para la detección de errores y la mejora de la calidad del código JavaScript. Se usa para mantener el código limpio y consistente, asegurando buenas prácticas de desarrollo y evitando errores comunes.

Estas tecnologías se eligieron para ofrecer un entorno de desarrollo eficiente y optimizado, desde la creación de interfaces interactivas hasta la garantía de un código de calidad y una app robusta y fácil de mantener.


* * * * *

Características principales
---------------------------

-   Listado de películas con datos obtenidos desde la Studio Ghibli API (https://ghibliapi.herokuapp.com/).
-   Buscador con soporte para autocompletado.
-   Detalle básico de cada película.
-   Interfaz limpia y agradable a la vista, con un diseño responsivo.

* * * * *

### Características adicionales
-----------------------------

Para mejorar la experiencia y el rendimiento de la aplicación, se tomaron las siguientes decisiones y características adicionales:

- **Renderizado del lado del servidor (SSR)**: Se decidió utilizar SSR para una carga más rápida de la página, ya que los componentes no cambiarían después de la carga inicial, mejorando la performance y la optimización para SEO.
- **Sesiones con Clerk**: Se implementó Clerk para gestionar las sesiones de usuario, lo que permite manejar autenticación y gestión de sesiones de forma sencilla y segura.
- **Sección de favoritos**: Con las sesiones de Clerk, se añadió una funcionalidad de favoritos, permitiendo a los usuarios guardar sus películas preferidas para un acceso rápido.
- **Tema oscuro**: Se implementó un tema oscuro, mejorando la accesibilidad y la experiencia visual de la aplicación, especialmente en entornos con poca luz.
- **Pruebas E2E con Cypress**: Se agregaron pruebas end-to-end (E2E) con Cypress para garantizar que la landing page de la aplicación y las funcionalidades de búsqueda funcionen correctamente en diferentes escenarios de usuario.


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

### Cómo probar Cypress en local
----------------------

Para ejecutar Cypress en tu entorno local, abre la interfaz gráfica de Cypress con el siguiente comando:

`npm run cy:open`

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
