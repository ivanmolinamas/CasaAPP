import { useState, useEffect } from "react";
import classes from "./Time.module.css";


/**
 * Componente que muestra la hora y fecha actual
 * @returns 
 */
function Reloj() {
  // Estado para almacenar la hora actual
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
    "Junio", "Julio", "Agosto", "Septiembre", 
    "Octubre", "Noviembre", "Diciembre"
  ];


  // se usan dos funciones para en CSS poder aplicar mejor como organizarlo
  useEffect(() => {
    // Función para actualizar la hora
    const actualizarHora = () => {
      const fecha = new Date();
      const horas = String(fecha.getHours()).padStart(2, "0");
      const minutos = String(fecha.getMinutes()).padStart(2, "0");
      //const segundos = String(fecha.getSeconds()).padStart(2, "0");
      setHora(`${horas}:${minutos}`);
    };

    // Funcion para actualiar el dia
    const actualizarDia = () => {
        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = meses[fecha.getMonth()];
        const ano = String(fecha.getFullYear()).padStart(2, "0");
        setFecha(`${dia} ${mes} ${ano}`);
    }

    // Actualizar la hora cada segundo
    const intervalHora = setInterval(actualizarHora, 1000);
    const intervalDia = setInterval(actualizarDia, 1000);

    // Llamar a actualizarHora una vez para mostrar la hora inmediatamente
    actualizarHora();
    actualizarDia()

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
        clearInterval(intervalHora);
        clearInterval(intervalDia);
      };

  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div className={classes.containerDate}> 
      <h4 className={classes.date}>{fecha}</h4>
      <h4 className={classes.date}>{hora}</h4>
    </div>
  );
}

export default Reloj;
