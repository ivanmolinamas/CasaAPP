import { getUsers, removeUser, toggleUserRole, crearUsuarioNuevo, changeUserPassword } from "../../services/dbconnect";
import classes from "./Admin.module.css";
import { useState, useEffect } from "react";
import ButtonRa from "../../components/button/ButtonRa";
import { AuthContext } from "../../hooks/AuthContext";
import { useContext } from "react";
import { Button } from "@radix-ui/themes";
import React from "react";
import DOMPurify from "dompurify"; // Sanitizador de datos

export default function Config() {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const { id } = useContext(AuthContext); //Id del usuario conectado
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  })


  async function mostrarUsuarios() {
    try {
      const usuarios = await getUsers();
      //console.log("Usuarios:", usuarios);
      // Aquí podrías render la lista en tu interfaz, por ejemplo:
      usuarios.forEach((usuario) => {
        /*console.log(
          `ID: ${usuario.id}, User: ${usuario.user}, Email: ${usuario.email}, Rol: ${usuario.rol}`
        );*/
      });
      if (usuarios.length > 0) {
        setUsuarios(usuarios); // Actualizamos el estado con los usuarios
      } else {
        console.error("Error al obtener usuarios:", response.message);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  }
  /*
  async function borrarUsuario(usuarioID) {
    try {
      // Lógica para eliminar un usuario
      removeUser(usuarioID);
      mostrarUsuarios(); // Actualizamos la lista de usuarios después de borrar
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message)
  }
}*/

  async function borrarUsuario(usuarioID) {
    // Mostrar popup de confirmación antes de borrar
    // TO DO --  debería cambiarse a una ventana mas bonita en el futuro
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (confirmDelete) {
      try {
        await removeUser(usuarioID); // Lógica para eliminar el usuario
        mostrarUsuarios(); // Actualizamos la lista de usuarios después de borrar
      } catch (error) {
        console.error("Error al eliminar usuario:", error.message);
      }
    } else {
      console.log("Eliminación cancelada");
    }
  }

  async function cambiarRolUsuario(usuarioID) {
    // Mostrar popup de confirmación antes de borrar
    // TO DO --  debería cambiarse a una ventana mas bonita en el futuro
    //console.log("cambiarRolUsuario :" + usuarioID);
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas cambiar el rol del usuario?"
    );

    if (confirmDelete) {
      try {
        await toggleUserRole(usuarioID); // Lógica para eliminar el usuario
        mostrarUsuarios(); // Actualizamos la lista de usuarios después de borrar
      } catch (error) {
        console.error("Error cambiar el rol del usuario:", error.message);
      }
    } else {
      //console.log("Cambio de rol cancelada");
    }
  }
 const handleCreateUser = async (e) => {
    e.preventDefault();
    //console.log(newUser);

    // Sanitizamos los datos de entrada para evitar inyección de código
    const sanitizedUser = DOMPurify.sanitize(newUser.name); //correcion aqui
    const sanitizedPassword = DOMPurify.sanitize(newUser.password);
    const sanitizedEmail = DOMPurify.sanitize(newUser.email);
    //console.log(sanitizedUser, sanitizedPassword, sanitizedEmail); //debug mode
    crearUsuarioNuevo(sanitizedUser ,sanitizedPassword,sanitizedEmail )
      .then((data) => {
        //console.log("usuario creado correctamente", data)
        //console.log(data.user)
        const newUserName = data.user;
        setSuccessMessage(`Usuario "${newUserName}" creado correctamente.`);
        setError(null); // Limpia el mensaje de error si existía
      })
      .catch((error) => {
        //console.log("Error en el login: " + error);
        setError(error || "Error inesperado");
      });
  };
  // useEffect para cargar los usuarios al montar el componente
  useEffect(() => {
    mostrarUsuarios();
  }, []); // El array vacío asegura que se ejecute solo al cargar la página


  // Función para cambiar la contraseña
  const handleChangePassword = async (userID) => {
    // Solicitar nueva contraseña al usuario
    const newPassword = prompt("Introduce tu nueva contraseña:");

    if (!newPassword) {
      alert("No se introdujo ninguna contraseña.");
      return;
    }

    try {
      await changeUserPassword(userID, newPassword); // Lógica cambiar la contraseña
      alert("Contraseña cambiada correctamente.");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error.message);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Administración de usuarios</h1>
      {/* Render la tabla solo si hay usuarios */}
      <h2>Lista de Usuarios</h2>
      <ButtonRa size="2" onClick={mostrarUsuarios}>Actualizar tabla Usuarios</ButtonRa>
      <div className={classes.tableContainer}>
        {usuarios.length > 0 ? (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) =>
                usuario.id != id ? (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td className={classes.capitalize}>{usuario.user}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <div className={classes.flexGap}>
                        { // ocultamos los botones de cambiar rol para admin
                        usuario.user === "admin" ? null : (
                          // Mostrar botón para convertir en usuario o admin según el rol actual
                          usuario.rol === "admin" ? (
                            <ButtonRa
                              color={"yellow"}
                              size="2"
                              onClick={() => cambiarRolUsuario(usuario.id)}
                            >
                              Convertir en Usuario
                            </ButtonRa>
                          ) : (
                            <ButtonRa
                              color={"yellow"}
                              size="2"
                              onClick={() => cambiarRolUsuario(usuario.id)}
                            >
                              Convertir en Admin
                            </ButtonRa>
                          )
                        )
                        }
                        <ButtonRa
                          color={"orange"}
                          size="2"
                          onClick={() =>  handleChangePassword(usuario.id)}
                        >
                          Cambiar contraseña
                        </ButtonRa>
                        {
                          // ocultamos el botón de eliminar para admin
                          usuario.user === "admin" ? null : (
                            <ButtonRa
                            color={"red"}
                            size="2"
                            onClick={() => borrarUsuario(usuario.id)}
                          >
                            Eliminar
                          </ButtonRa>  
                          )
                        }
                        
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        ) : (
          <p>No se han cargado usuarios.</p>
        )}
      </div>
      <div className={classes.formContainer}>
        <h2>Crear nuevo usuario</h2>
        <form className={classes.Form}>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="newUser">
              Nombre de usuario
            </label>
            <input className={classes.Input} id="newUser" type="text"
            onChange={(e) => 
              setNewUser((prev) => ({
              ...prev,
              name: e.target.value, // Actualiza solo el campo "name"
            }))
          }
            
              />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="newPassword">
              Contraseña
            </label>
            <input
              className={classes.Input}
              id="newPassword"
              type="password"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  password: e.target.value, // Actualiza solo el campo "password"
                }))
              }
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="newMail">
              Email
            </label>
            <input 
            className={classes.Input} 
            id="newMail" 
            type="email" 
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                email: e.target.value, // Actualiza solo el campo "email"
              }))
            }
            />
          {error && <p className={classes.error}>{error}</p>}
          {successMessage && <p className={classes.success}>{successMessage}</p>}
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <ButtonRa 
            className={`${classes.Button} green`}
            onClick={handleCreateUser}
            >Crear cuenta</ButtonRa>
          </div>
    

        </form>
      </div>
    </div>
  );
}
