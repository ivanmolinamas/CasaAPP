export async function dimmer(deviceId, brightness) {
  try {
    const response = await fetch(`http://localhost:3000/light/${deviceId}/dimmer/${brightness}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    return await response.json(); // Procesa la respuesta si es necesario
  } catch (error) {
    console.error(`Error al alternar la luz ${deviceId}:`, error);
    throw error; // Maneja el error donde llames esta función
  }
}