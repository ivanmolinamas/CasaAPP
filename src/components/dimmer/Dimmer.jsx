import { useState } from 'react';
import classes from "./Dimmer.module.css";
import { Heading } from "@radix-ui/themes";
import * as Slider from "@radix-ui/react-slider";


export default function Dimmer({ idName }) {

  const [value, setValue] = useState(50);

  function changeValue(newvalue){
    setValue(newvalue[0]);
    //console.log(newvalue[0])
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
