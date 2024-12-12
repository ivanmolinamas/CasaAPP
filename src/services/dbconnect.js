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
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
  
    socket.emit('verify-token', token, (response) => {
      if (response.status === 'success') {
        console.log('Token verificado:', response.user);
        // Aquí puedes redirigir a /dashboard o la página principal
      } else {
        console.log('Token inválido:', response.message);
        // Aquí puedes redirigir al usuario a la página de login
      }
    });
  }