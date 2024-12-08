// src/services/deviceService.js
import { socket } from "./socketService";

// Función para obtener el estado de los dispositivos
const getDevicesState = (setDevices) => {
  socket.on("devicesState", (data) => {
    console.log(data);
    setDevices({
      lights: data.lights,
      plugs: data.plugs,
    });
  });
};

// Función para cambiar el estado de un dispositivo (encender o apagar)
const toggleDevice = (id, onOff) => {
  socket.emit("toggleDevice", { id, onOff });
};

// Función para cambiar el estado de un dispositivo (encender o apagar)
const dimmerDevice = (id, brightness) => {
  socket.emit("dimmerDevice", { id, brightness });
};

// Función para manejar el encendido/apagado de una luz
const toggleLight = (id) => {
  socket.emit("lightToggle", id);
};


export { getDevicesState, toggleDevice, toggleLight, dimmerDevice };
