import { socket } from "./socketService";

// Obtener dispositivos personales
export async function getPersonalDevices(ID) {
  return new Promise((resolve, reject) => {
    // Emitimos el evento para obtener los dispositivos
    socket.emit("getPersonalDevices", { id: ID }, (response) => {
      console.log("id:  ", ID);
      if (response.status === "success") {
        console.log("Dispositivos personales obtenidos:", response.devices);
        resolve(response.devices); // Devuelve la lista de dispositivos
      } else {
        console.error("Error al obtener los dispositivos:", response.error);
        reject(new Error(response.error));
      }
    });
  });
}

// Actualizar dispositivo personal
export async function updatePersonalDevice(
  userID,
  deviceId,
  customName,
  widgetType
) {
  return new Promise((resolve, reject) => {
    console.log("Actualizando dispositivo personal...");
    // Emitimos el evento para actualizar un dispositivo personal
    socket.emit(
      "setNamePersonalDevice",
      { id: userID, body: { deviceId, customName, widgetType } },
      (response) => {
        if (response.status === "success") {
          console.log(
            "Dispositivo actualizado correctamente:",
            response.message
          );
          resolve(response.message); // Devuelve el mensaje de éxito
        } else {
          console.error("Error al actualizar el dispositivo:", response.error);
          reject(new Error(response.error));
        }
      }
    );
  });
}
