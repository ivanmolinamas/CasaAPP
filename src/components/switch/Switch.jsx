import classes from "./SwitchComp.module.css";
import * as Switch from "@radix-ui/react-switch";
import { Box, Heading, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { toggleDevice as toggle } from "../../services/deviceService";



export default function SwitchComp({ idName, deviceID, status }) {
  // guardamos el estado de la bombilla
  const [isOn, setIsOn] = useState(status);


  const toggleDevice = (id) => {
    toggle(id);
    setIsOn(!isOn);
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
              onCheckedChange={() => toggleDevice(deviceID)}
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
