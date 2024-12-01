import classes from "./SwitchComp.module.css";
import * as Switch from "@radix-ui/react-switch";
import { Box, Heading, Flex } from "@radix-ui/themes";
import { toggleLight } from "../../services/toggleLigth";
import { useEffect, useState } from "react";
import { stateDevice } from "../../services/stateDevice"; // Importa la función desde api.js

export default function SwitchComp({ idName, deviceID }) {
  const [isOn, setIsOn] = useState(null);

  // carga el estado inicial del interruptor según el valor real
  useEffect(() => {
    const fetchState = async () => {
      const state = await stateDevice(deviceID); // Llama a la función de api.js
      setIsOn(state); // Actualiza el estado local
    };
    fetchState();
  }, [deviceID]);

  const handleToggle = async () => {
  
    try {
      // Cambia el estado local de forma optimista
      setIsOn((prevState) => !prevState);

      // Llama a la API para alternar la luz
      await toggleLight(deviceID);
      console.log(`Alternando ${idName}...`);

      // Espera un breve momento para permitir la sincronización
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500 ms

      // Sincroniza el estado con el backend
      const updatedState = await stateDevice(deviceID);
      setIsOn(updatedState); // Corrige el estado si es necesario
    } catch (error) {
      // En caso de error, revertimos el cambio local
      setIsOn((prevState) => !prevState);
      console.error(`Error al alternar ${idName}:`, error);
    }
  };

  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="center" gap="3">
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
              onCheckedChange={handleToggle}
              checked={isOn}
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
