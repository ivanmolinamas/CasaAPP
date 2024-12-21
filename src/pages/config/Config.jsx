import { getUsers } from "../../services/dbconnect";
import classes from "./Config.module.css";
import { useState } from "react";
import ButtonRa from "../../components/button/ButtonRa";



export default function Config() {

  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios

  async function mostrarUsuarios() {
    try {
      const usuarios = await getUsers();
      console.log("Usuarios:", usuarios);
      // Aquí podrías renderizar la lista en tu interfaz, por ejemplo:
      usuarios.forEach((usuario) => {
        console.log(`ID: ${usuario.id}, User: ${usuario.user}, Email: ${usuario.email}, Rol: ${usuario.rol}`);
      });
      if (usuarios.length > 0 ) {
        setUsuarios(usuarios); // Actualizamos el estado con los usuarios
      } else {
        console.error("Error al obtener usuarios:", response.message);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  }


  return (
    <div className={classes.container}>
      <h1>Configuración</h1>
      <ButtonRa onClick={mostrarUsuarios} >Mostrar Usuarios</ButtonRa>
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
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.user}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
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