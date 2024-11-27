import classes from "./NavButton.module.css";
import { Link } from "react-router-dom";
import { Text } from "@radix-ui/themes";
/**
 * Boton para navegar entre las paginas
 * @param {object} props - Props que se le pasan al componente
 * @param {string} props.texto - Texto que se muestra en el botón
 * @param {string} props.ruta - Ruta a la que se dirige el botón 
 * @returns 
 */
function NavButton({ texto, ruta }) {
    return (
        <Link to={ruta} className={classes.container}>
            <Text>{texto}</Text>
        </Link>
    )


}



export default NavButton;
