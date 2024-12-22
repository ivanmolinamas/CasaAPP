import { getUsers, removeUser } from "../../services/dbconnect";
import classes from "./Admin.module.css";
import { useState, useEffect } from "react";
import ButtonRa from "../../components/button/ButtonRa";

export default function Config() {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios

  async function mostrarUsuarios() {
    try {
      const usuarios = await getUsers();
      //console.log("Usuarios:", usuarios);
      // Aquí podrías renderizar la lista en tu interfaz, por ejemplo:
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

  async function borrarUsuario(usuarioID) {
    try {
      // Lógica para eliminar un usuario
      removeUser(usuarioID);
      mostrarUsuarios(); // Actualizamos la lista de usuarios después de borrar
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message)
  }
}

 // useEffect para cargar los usuarios al montar el componente
 useEffect(() => {
  mostrarUsuarios();
}, []); // El array vacío asegura que se ejecute solo al cargar la página

  return (
    <div className={classes.container}>
      <h1>Configuración</h1>
      <ButtonRa onClick={mostrarUsuarios}>Actualizar tabla Usuarios</ButtonRa>
      {/* Renderizar la tabla solo si hay usuarios */}
      <h2>Lista de Usuarios</h2>
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
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td >{usuario.id}</td>
                  <td className={classes.capitalize}>{usuario.user}</td>
                  <td >{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <div className={classes.flexGap}>
                      <ButtonRa color={"yellow"} size="2" onClick={() => console.log("Editar usuario", usuario.id)}>
                        Editar
                      </ButtonRa>
                      <ButtonRa color={"red"} size="2" onClick={() => borrarUsuario(usuario.id)}>
                        Eliminar
                      </ButtonRa>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se han cargado usuarios.</p>
        )}
      </div>
    </div>
  );
}
