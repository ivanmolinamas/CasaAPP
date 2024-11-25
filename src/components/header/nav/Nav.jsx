import classes from "./Nav.module.css";
import NavButton from "./navButton/NavButton";

export default function Nav() {





    return (
        <div className={classes.buttonContainer}>
            <NavButton texto={"Dashboard"}/>
            <NavButton texto={"Automatizaciones"}/>
            <NavButton texto={"Configuración"}/>
        </div>
    );
}