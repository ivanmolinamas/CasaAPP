import { io } from "socket.io-client";

// Creamos una única conexión para toda la aplicación
//DEV
//const socket = io("http://192.168.1.54:4000");
//Produ
const socket = io("http://192.168.1.41:4000");

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