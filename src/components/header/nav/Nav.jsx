import classes from "./Nav.module.css";
import NavButton from "./navButton/NavButton";
import { AuthContext } from "../../../hooks/AuthContext";
import { useContext } from "react";
import ButtonRa from "../../button/ButtonRa";



/**
 * Componente que contiene los botones de navegacion
 * @param {object} props - Props que se le pasan al componente
 * @returns 
 */
export default function Nav() {
    const { logout, authToken, user, rol } = useContext(AuthContext);


    const handleLogOut = () => {
        logout();
    };
    return (

        <div className={classes.buttonContainer}>
            <NavButton texto={"Dashboard"} ruta="/dashboard"/>
            <NavButton texto={"Automatizaciones"} ruta="automatizacion"/>
            <NavButton texto={"Configuración"} ruta="configuracion"/>
        
            {rol === "admin" && ( // Mostramos solo si el usuario tiene rol de admin
                <NavButton texto={"Administración"} ruta="admin" />
            )}


            {authToken && ( // Mostramos el botón de cerrar sesión solo si hay un authToken
            
                <div>
                <p className={classes.capitalize}>Hola { user }.</p>
                <ButtonRa
                    type="button"
                    onClick={handleLogOut}
                    className={classes.logout}
                    size="2"
                >
                    Cerrar sesión
                </ButtonRa>
                </div>
            )}
        </div>
    );
}