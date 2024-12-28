import { socket } from "./socketService";
// Hook para redirigir

// función para el login
export async function login(user, password) {
  return new Promise((resolve, reject) => {
    // Emitimos el evento 'login' con los datos del usuario
    socket.emit("login", { user, password }, (response) => {
      if (response.status === "success") {
        console.log("Login exitoso:", response);
        // Aquí puedo guardar el token en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("rol", response.rol); // Guardamos el rol del usuario
        resolve(response);
      } else {
        console.error("Error en el login:", response.message);
        reject(response.message);
      }
    });
  });
}

// función para el crear usuario
export async function crearUsuarioNuevo(user, password, email) {
  return new Promise((resolve, reject) => {
    // Emitimos el evento 'login' con los datos del usuario
    socket.emit("register", { user, email, password }, (response) => {
      if (response.status === "success") {
        console.log("Usuario creado:", response);
        resolve(response);
      } else {
        console.error("Error al crear el usuario:", response.message);
        reject(response.message);
      }
    });
  });
}

// Función para verificar token
export function verifyToken() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    //console.log("Verificando token:", token);
    if (!token) {
      console.log("No token found");
      return reject(new Error("No token found"));
    }

    socket.emit("verifyToken", { token }, (response) => {
      //console.log("Respuesta del servidor:", response);
      if (response.status === "success") {
        //console.log("Token verificado:", response);
        // Usar los datos para configurar el estado del usuario
        resolve(response.userData); // Devuelve el usuario si el token es válido
      } else {
        console.log("Token inválido:", response.message);
        reject(new Error("Token inválido"));
      }
    });
  });
}

export async function getUsers() {
  return new Promise((resolve, reject) => {
    // Emitimos el evento 'obtenerUsuarios'
    socket.emit("getUsers", (response) => {
      if (response.status === "success") {
        //console.log("Lista de usuarios obtenida:", response.usuarios);
        resolve(response.usuarios); // Devuelve la lista de usuarios
      } else {
        console.error(
          "Error al obtener la lista de usuarios:",
          response.message
        );
        reject(new Error(response.message));
      }
    });
  });
}

export async function removeUser(userID) {
  return new Promise((resolve, reject) => {
    // Emitimos el evento 'obtenerUsuarios'
    socket.emit("removeUser", { userID }, (response) => {
      if (response.status === "success") {
        console.log("Usuario eliminado:", response.message);
        resolve(response.usuarios); // Devuelve la lista de usuarios
      } else {
        console.error(
          "Error al obtener la lista de usuarios:",
          response.message
        );
        reject(new Error(response.message));
      }
    });
  });
}

// Función para cambiar el rol de un usuario
export async function toggleUserRole(userID) {
  return new Promise((resolve, reject) => {
    // Emitimos el evento 'toggleUserRole' con el ID del usuario
    socket.emit("toggleUserRole", { userID }, (response) => {
      if (response.status === "success") {
        console.log("Rol del usuario actualizado exitosamente:", response.message);
        resolve(response.message); // Resolvemos con el mensaje de éxito
      } else {
        console.error("Error al cambiar el rol del usuario:", response.message);
        reject(new Error(response.message)); // Rechazamos con el mensaje de error
      }
    });
  });
}
