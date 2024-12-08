import { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import classes from "./PopoverColor.module.css";
import { setTemperatureColor } from "../../services/deviceService";




export default function PopoverColor({ deviceID, colorTemperature }) {
  const [value, setValue] = useState(colorTemperature);

  // useEffect para sincronizar el estado cuando el estado del dispositivo cambie desde el backend
  useEffect(() => {
    setValue(colorTemperature); // Sincroniza el estado con el prop `deviceStatus`
  }, [colorTemperature]); // El efecto se ejecutará cuando `deviceStatus` cambie

  function handleSelect(color) {
    console.log("handleSelect",deviceID, color);
	setTemperatureColor(deviceID, color); // Ejecutamos la función toggle y le pasamos la ID del componente
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={classes.IconButton} aria-label="Update dimensions">
          <MixerHorizontalIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={classes.Content} sideOffset={5}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p className={classes.Text} style={{ marginBottom: 10 }}>
              Color
            </p>
            <form>
              <RadioGroup.Root
                className={classes.Root}
                defaultValue={value}
                onValueChange={handleSelect}
                aria-label="View density"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroup.Item 
				  className={classes.Item0} 
				  value={0} 
				  id="r1">
                    <RadioGroup.Indicator className={classes.Indicator} />
                  </RadioGroup.Item>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroup.Item
                    className={classes.Item50}
                    value={50}
                    id="r2"
                  >
                    <RadioGroup.Indicator className={classes.Indicator} />
                  </RadioGroup.Item>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroup.Item
                    className={classes.Item100}
                    value={100}
                    id="r3"
                  >
                    <RadioGroup.Indicator className={classes.Indicator} />
                  </RadioGroup.Item>
                </div>
              </RadioGroup.Root>
            </form>
          </div>
          <Popover.Close className={classes.Close} aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className={classes.Arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
