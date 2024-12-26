// src/services/deviceService.js
import { socket } from "./socketService";

// Función para obtener el estado de los dispositivos
const getDevicesState = (setDevices , id) => {
  // enviamos al backend el id del usuario
  console.log("id del usuario:",id);
  socket.emit("setIdUser", { id: id });
 
  socket.on("devicesState", (data) => {
    //console.log(data);
    console.log("Datos de bombillas y enchufes recibidos de backend");
    setDevices({
      lights: data.lights,
      plugs: data.plugs,
    });
  });
};
const getDevicesStateNow = (id) => {
  socket.emit("getDevicesState", {id: id});
};
// Función para cambiar el estado de un dispositivo (encender o apagar)
const toggleDevice = (id, onOff) => {
  console.log("cambiar estado device ID:", id);
  socket.emit("setToggleDevice", { id, onOff });
};

// Función para cambiar el estado de un dispositivo (encender o apagar)
const setDimmerDevice2 = (id, brightness) => {
  socket.emit("setDimmerDevice", { id, brightness });
};
// Función para cambiar la temperatura de color de una bombilla
const setTemperatureColor2 = (id, temperature) => {
  socket.emit("setTemperature", { id, temperature });
};

// Función para manejar el encendido/apagado de una luz
const toggleLight = (id) => {
  console.log("cambiar estado bombilla ID:", id);
  socket.emit("setLightToggle", id);
};




////////////////////
// Funciones con callback
const toggleLight2 = (id) => {
  console.log("cambiar estado bombilla ID:", id);
  if (!id) {
    console.log("ID no válido");
    return;
  }
  socket.emit("setLightToggle2", { id }, (response) => {
    if (response.status === "success") {
      console.log("Luz cambiada correctamente");
      console.log(response);
    } else {
      console.log("Error al cambiar la luz:", response.message);
    }
  });
};

// Dimmear
const setDimmerDevice = (id, brightness) => {
  console.log("cambiar estado bombilla ID:", id);
  if (!id) {
    console.log("ID no válido");
    return;
  }

  socket.emit("setDimmerDevice", { id,brightness }, (response) => {
    if (response.status === "success") {
      console.log("Luz cambiada correctamente");
      console.log(response.message);
    } else {
      console.log("Error al cambiar la luz:", response.message);
    }
  });
};
 
// Cambiar color temperatura bombilla
const setTemperatureColor = (id, temperature) => {
  console.log("cambiar estado bombilla ID:", id);
  if (!id) {
    console.log("ID no válido");
    return;
  }
  socket.emit("setTemperature", { id,temperature }, (response) => {
    if (response.status === "success") {
      console.log("Luz cambiada de color correctamente");
      console.log(response.message);
    } else {
      console.log("Error al cambiar color de luz:", response.message);
    }
  });
};





export {
  getDevicesState,
  toggleDevice,
  toggleLight,
  setDimmerDevice,
  setTemperatureColor,
  getDevicesStateNow,
  toggleLight2,
};
