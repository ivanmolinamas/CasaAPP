import { useState, useEffect } from 'react';
import classes from "./Dimmer.module.css";
import { Heading } from "@radix-ui/themes";
import * as Slider from "@radix-ui/react-slider";
import { statusDimmer } from "../../services/statusDimmer";
import { dimmer } from "../../services/dimmer";

export default function Dimmer({ idName, deviceID }) {
  const [value, setValue] = useState(50);

  useEffect(() => {
    const fetchState = async () => {
      const state = await statusDimmer(deviceID); // Llama a la función de api.js
      setValue(state); // Actualiza el estado local
    };
    fetchState();
  }, [deviceID]);


  
  const changeValue = async(newvalue)  => {

    // TO DO - hacer que vaya mejor el dimmer, mas fino 


    try{
      //llamamos a la API para alterar el dimmer
      await  dimmer(deviceID, newvalue[0]);

      //espera un breve momento para permetir la sincronización
      //await new Promise((resolve) => setTimeout(resolve, 1500)); //1seg

      //sincroniza el estado con el backend
      const updatedState = await statusDimmer(deviceID);
      setValue(updatedState);

    }catch (error) {
      console.error(`Error al alterar ${idName}:`, error);
    }

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
