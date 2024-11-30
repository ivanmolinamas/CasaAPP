import classes from "./ButtonRa.module.css";
import { Button } from "@radix-ui/themes";

export default function ButtonRa({ texto }) {

    

    return (
      <Button size="4" >
        {texto}
      </Button>
    )

}