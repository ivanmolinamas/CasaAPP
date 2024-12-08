import { useState, useEffect } from 'react';
import classes from "./Dimmer.module.css";
import { Heading } from "@radix-ui/themes";
import * as Slider from "@radix-ui/react-slider";
import { setDimmerDevice } from "../../services/deviceService";

export default function Dimmer({ idName, deviceID, dimmer,dimmerStatus }) {
  const [value, setValue] = useState(dimmer);

// useEffect para sincronizar el estado cuando el estado del dispositivo cambie desde el backend
useEffect(() => {
  setTimeout(() => {
    setValue(dimmer); // Sincroniza el estado con el prop `deviceStatus`
  }), 0
}, [dimmer]); // El efecto se ejecutará cuando `deviceStatus` cambie

function changeValue(newValue) {
  setDimmerDevice(deviceID, newValue[0]); // actualiza el backend
  //setValue(newValue[0]); //actualiza el valor local
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
