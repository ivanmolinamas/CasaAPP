import classes from "./Button.module.css";

export default function Button({ texto }) {

    

    return (
      <button type="button" className={classes.button}>
        {texto}
      </button>
    )

}