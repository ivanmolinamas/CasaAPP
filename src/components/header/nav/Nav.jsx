import classes from "./Nav.module.css";
import NavButton from "./navButton/NavButton";
import { AuthContext } from "../../../hooks/AuthContext";
import { useContext } from "react";




/**
 * Componente que contiene los botones de navegacion
 * @param {object} props - Props que se le pasan al componente
 * @returns 
 */
export default function Nav() {
    const { logout, authToken } = useContext(AuthContext);

    const handleLogOut = () => {
        logout();
    };
    return (

        <div className={classes.buttonContainer}>
            <NavButton texto={"Dashboard"} ruta="/dashboard"/>
            <NavButton texto={"Automatizaciones"} ruta="automatizaciones"/>
            <NavButton texto={"Configuración"} ruta="config"/>
            {authToken && ( // Mostramos el botón de cerrar sesión solo si hay un authToken
                
                <button
                    type="button"
                    onClick={handleLogOut}
                    className={classes.logout}
                >
                    Cerrar sesión
                </button>
            )}
        </div>
    );
}