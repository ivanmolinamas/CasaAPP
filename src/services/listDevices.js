import { socket } from "./socketService"

const devicesList = [] // Lista de dispositivos

// Traemos la lista con su estado de los dispositivos desde el backend
socket.on("devicesState", (data) => {
    devicesList.push(data.lights); // Actualiza el estado con la lista de dispositivos
    //{ lights: [], plugs: [] }
    console.log("Datos de bombillas actualizados");
  });

  export default  { devicesList }