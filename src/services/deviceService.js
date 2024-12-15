// src/services/deviceService.js
import { socket } from "./socketService";

// Función para obtener el estado de los dispositivos
const getDevicesState = (setDevices) => {
  socket.on("devicesState", (data) => {
    //console.log(data);
    console.log("Datos de bombillas y enchufes recibidos de backend")
    setDevices({
      lights: data.lights,
      plugs: data.plugs,
    });
  });
};
const getDevicesStateNow = () => {
socket.emit("getDevicesState");
};
// Función para cambiar el estado de un dispositivo (encender o apagar)
const toggleDevice = (id, onOff) => {
  socket.emit("setToggleDevice", { id, onOff });
};

// Función para cambiar el estado de un dispositivo (encender o apagar)
const setDimmerDevice = (id, brightness) => {
  socket.emit("setDimmerDevice", { id, brightness });
};
// Función para cambiar la temperatura de color de una bombilla
const setTemperatureColor = (id, temperature) => {
  socket.emit("setTemperature", { id, temperature });
};

// Función para manejar el encendido/apagado de una luz
const toggleLight = (id) => {
  socket.emit("setLightToggle", id);
};


export { getDevicesState, toggleDevice, toggleLight, setDimmerDevice, setTemperatureColor, getDevicesStateNow  };
