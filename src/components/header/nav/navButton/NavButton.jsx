import classes from "./NavButton.module.css";

function NavButton({ texto }) {


    return (
        <div className={classes.container}
                
        >
            <p>{texto}</p>
        </div>
    )


}



export default NavButton;
