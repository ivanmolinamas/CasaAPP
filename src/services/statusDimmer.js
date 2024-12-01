export async function statusDimmer(bulbId) {
  try {
    const response = await fetch(`http://localhost:3000/light/${bulbId}/statusdimmer`);
    if (!response.ok) {
      throw new Error("Error al obtener el estado de la bombilla");
    }
    const data = await response.json();
    console.log(data);
    return data.dimmer; // Devuelve true si está encendida, false si no
  } catch (error) {
    console.error("Error en obtener valor dimmer:", error);
    return null; // Opcional: Maneja errores devolviendo un valor por defecto
  }
}