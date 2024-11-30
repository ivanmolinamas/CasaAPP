import classes from "./SwitchComp.module.css";
import * as Switch from "@radix-ui/react-switch";
import { Box, Heading, Flex } from "@radix-ui/themes";
import { toggleLight } from "../../services/toggleLigth";

export default function SwitchComp({idName,  deviceId}) {

  const handleToggle = async () => {
    try {
      const result = await toggleLight(deviceId);
      //console.log(`Luz ${idName} alternada:`, result);
    } catch (error) {
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
