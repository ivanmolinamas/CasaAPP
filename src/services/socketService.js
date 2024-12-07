import { io } from "socket.io-client";

// Creamos una única conexión para toda la aplicación
const socket = io("http://localhost:4000");

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