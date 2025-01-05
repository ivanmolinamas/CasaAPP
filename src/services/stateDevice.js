export async function stateDevice(bulbId) {
  try {
    const response = await fetch(`http://localhost:3000/light/${bulbId}/state`);
    if (!response.ok) {
      throw new Error("Error al obtener el estado de la bombilla");
    }
    const data = await response.json();
    //console.log(data); //debug
    return data.state === 'true'; // Devuelve true si está encendida, false si no
  } catch (error) {
    console.error("Error en getLightState:", error);
    return null; // Opcional: Maneja errores devolviendo un valor por defecto
  }
}