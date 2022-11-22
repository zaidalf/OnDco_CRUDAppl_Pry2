# Introduccion

Este es el segundo proyecto subido a GitHub - Bootcamp UDD

## Objetivo del Proyectos

Construir un aplicación CRUD con HTML, CSS & JS

### Componentes

El desarrollo esta hecho en HTML5, CSS3 y JavaScript, tambien se incorporar funcionalidades Bootstrap.

Aplicación se desarrolla como prototipo básico para administrar asociados de APR (Agua Potable Rural).

Observaciones:
Originalmente habia definido el proyecto usando elemntos <button> dinámicos, tnto para el formuario como para la tabla de datos. 

Pero presente problemas funcionales cuando se hacia click en los botones, los cuales se detectaban como eventos, no logre solucionar el problema, por mucho que busque soluciones en internet.

Finalmente, use <button> estaticos en el formuario, y mantuve los botones dinamicos en la tabla de datos. Aún asi los botones de la tabla no funcionan correctamente, porque no se detectan como eventos al hacer click en ellos en la segunda pasada del HTML, por lo que hay que recargar la pagina para que funcionen.

Versión V7:
Versión actualizadas que corrige el funcionamiento anómalo de los botones dinámicos.

Por recomendación de la asesoria 1:1 recomendo el manejo de los eventos de los botones dinámicos con "onclick" event.

De esa manera se subsana la falla en la cual los botones quedaban invalidos y no detectaban eventos hasta el refresh del HTML.


Attentamente.
Alf