import classes from "./ButtonRa.module.css";
import { Button } from "@radix-ui/themes";

export default function ButtonRa({ children , onClick}) {

    

    return (
      <Button size="4" onClick={onClick}>
        {children}
      </Button>
    )

}