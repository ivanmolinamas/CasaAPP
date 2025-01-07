import { io } from "socket.io-client";



// Obtenemos la URL del servidor desde las variables de entorno
//const socketURL = process.env.REACT_APP_SOCKET_URL;
const socketURL = "http://192.168.1.54:4000"; //dev
//const socketURL = "http://192.168.1.41:4000"; //Prod

console.log("URL del servidor:", socketURL);
// Creamos una única conexión para toda la aplicación
const socket = io(socketURL);

const connectSocket = () => {
  socket.on("connect", () => {
    console.log("Conectado al servidor");
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
  });

  return socket;
};

export { socket, connectSocket };