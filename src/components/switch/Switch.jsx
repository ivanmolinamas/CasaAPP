import classes from "./SwitchComp.module.css";
import * as Switch from "@radix-ui/react-switch";
import { Box, Heading, Flex } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { toggleDevice as toggle } from "../../services/deviceService";



export default function SwitchComp({ idName, deviceID, status, deviceStatus }) {
  // guardamos el estado de la bombilla
  const [isOn, setIsOn] = useState(status);

// useEffect para sincronizar el estado cuando el estado del dispositivo cambie desde el backend
useEffect(() => {
  setIsOn(deviceStatus); // Sincroniza el estado con el prop `deviceStatus`
}, [deviceStatus]); // El efecto se ejecutará cuando `deviceStatus` cambie

  const toggleDevice = (id) => {
    toggle(id); // Ejecutamos la función toggle y le pasamos la ID del componente
    setIsOn(!isOn); //somos optimistas y cambiamos el estado
  };



  return (
    <div className={classes.container}>
      <Box display="flex" align-items="center" gap="3">
        <form>
          <Flex
            direction="column"
            gap="4"
            p="1"
            justify="center"
            align="center"
          >
            <label
              className={classes.Label}
              htmlFor={idName}
              style={{ paddingRight: 15 }}
            >
              <Heading size="2">{idName}</Heading>
            </label>
            <Switch.Root
              className={classes.Root}
              id={idName}
              onCheckedChange={() => toggleDevice(deviceID)}
              checked={isOn} // usamos el estado 
            >
              <Switch.Thumb className={classes.Thumb} />
            </Switch.Root>
          </Flex>
        </form>
        {/*
            <div className={classes.status}>
              <Heading  size="4" >Encendido</Heading>
            </div>
            */}
      </Box>
    </div>
  );
}
