import classes from "./Nav.module.css";
import NavButton from "./navButton/NavButton";
import { AuthContext } from "../../../hooks/AuthContext";
//const authContext = useContext(AuthContext); // Accede al contexto aquí


/**
 * Componente que contiene los botones de navegacion
 * @param {object} props - Props que se le pasan al componente
 * @returns 
 */
export default function Nav() {

    const handleLogOut = () => {
        //authContext.logout;
    };
    return (

        <div className={classes.buttonContainer}>
            <NavButton texto={"Dashboard"} ruta="/dashboard"/>
            <NavButton texto={"Automatizaciones"} ruta="automatizaciones"/>
            <NavButton texto={"Configuración"} ruta="config"/>
            <button type="button" onClick={() => console.log("logout")} className={classes.logout}>Cerrar sesión</button>
        </div>
    );
}