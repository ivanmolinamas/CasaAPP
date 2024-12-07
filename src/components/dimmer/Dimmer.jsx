import { useState, useEffect } from 'react';
import classes from "./Dimmer.module.css";
import { Heading } from "@radix-ui/themes";
import * as Slider from "@radix-ui/react-slider";
import { dimmerDevice as dimmer} from "../../services/deviceService";

export default function Dimmer({ idName, deviceID }) {
  const [value, setValue] = useState(50);

function changeValue(newValue) {
  setValue(newValue[0]);
  dimmer(deviceID, newValue[0]);
}

  return (
    <div className={classes.container}>
      <form className={classes.form} >
        <div className={classes.info}>
        <Heading size="2">{idName}</Heading>
        <Heading size="4">{value}%</Heading>
        </div>
        <Slider.Root
          className={classes.Root}

          max={100}
          step={1}
          value={[value]}
          onValueChange={changeValue}
        >
          <Slider.Track className={classes.Track}>
            <Slider.Range className={classes.Range} />
          </Slider.Track>
          <Slider.Thumb className={classes.Thumb} aria-label="Volume" />
        </Slider.Root>
      </form>
    </div>
  );
}
