import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";

export default function useSocket() {
  const { token } = useAuth();
  const socket = io("http://localhost:3000", {
    auth: { token }
  });

  socket.on("connect", () => {
    console.log("Conectado a Socket.IO");
  });

  socket.on("adminEvent", (data) => {
    console.log(data.message);
  });

  socket.on("error", (error) => {
    console.error(error.message);
  });

  return socket;
}
