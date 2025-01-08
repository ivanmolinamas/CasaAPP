# CASAAPP 

## FRONTEND

Esta es la programación para la aplicación casaApp, con las tecnologías:
- React
- JavaScript
- Vite
- Socket io
- Radix UI
- dompurify

### Configuración importante 

Para una correcta comunicación con el backend, es importante configurar un parámetro.

En `services/socketService.js` tenemos la variable donde esta la IP y puerto del backend

```js
// Constante con la IP y puerto del servidor backend para la conexión.
const socketURL = "http://192.168.1.41:4000";
```

Es importante configurar este valor para un correcto funcionamiento de la App.


En la pagina de `login.jsx` existe la posibilidad de mostrar un login de tipo desarrollador, para poder crear cuentas de una manera mas cómoda.

En la linea 100`, podemos ver esta variable, si la ponemos en true activamos el modo DEV

 ```jsx
   // Modo de depuración para mostrar el formulario de login y facilitar las pruebas
  const debugMode = false; // Cambiar a true para ver el formulario de login
  ```

