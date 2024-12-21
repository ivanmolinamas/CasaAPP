import classes from "./ButtonRa.module.css";
import { Button } from "@radix-ui/themes";

export default function ButtonRa({ children , onClick, size = "4",color}) {

    

    return (
      <Button size={size} onClick={onClick} color={color}>
        {children}
      </Button>
    )

}