import classes from "./Nav.module.css";
import NavButton from "./navButton/NavButton";


/**
 * Componente que contiene los botones de navegacion
 * @param {object} props - Props que se le pasan al componente
 * @returns 
 */
export default function Nav() {

    return (
        <div className={classes.buttonContainer}>
            <NavButton texto={"Dashboard"} ruta="/dashboard"/>
            <NavButton texto={"Automatizaciones"} ruta="automatizaciones"/>
            <NavButton texto={"Configuración"} ruta="config"/>
        </div>
    );
}