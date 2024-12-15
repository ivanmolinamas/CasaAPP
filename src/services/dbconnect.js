import { socket } from "./socketService"
 // Hook para redirigir


// función para el login
export async function login(user, password) {
    return new Promise((resolve, reject) => {
      // Emitimos el evento 'login' con los datos del usuario
      socket.emit("login", { user, password }, (response) => {
        if (response.status === "success") {
          console.log("Login exitoso:", response);
          // Aquí puedes guardar el token en localStorage
          localStorage.setItem("token", response.token);
          resolve(response);

        } else {
          console.error("Error en el login:", response.message);
          reject(response.message);
        }
      });
    });
  }

// Función para verificar token
export function verifyToken() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    console.log('Verificando token:', token);
    if (!token) {
      console.log('No token found');
      return reject(new Error('No token found'));
    }

    socket.emit('verifyToken', { token }, (response) => {
      console.log('Respuesta del servidor:', response);
      if (response.status === 'success') {
        console.log('Token verificado:', response.user);
        resolve(response.user); // Devuelve el usuario si el token es válido
      } else {
        console.log('Token inválido:', response.message);
        reject(new Error('Token inválido'));
      }
    });
  });
  }

