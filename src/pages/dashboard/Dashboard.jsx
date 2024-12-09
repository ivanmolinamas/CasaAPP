import Dimmer from "../../components/dimmer/Dimmer";
import SwitchComp from "../../components/switch/Switch";
import TermoInfo from "../../components/termoInfo/TermoInfo";
import ButtonRa from "../../components/button/ButtonRa";
import classes from "./Dashboard.module.css";
import { Heading, Grid, Box, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { socket, connectSocket } from "../../services/socketService";
import { getDevicesState } from "../../services/deviceService";

//importamos socket io
//const socket = io("http://localhost:4000");

export default function Dashboard() {
  // estado de los dispositivos importados desde el backend
  const [devices, setDevices] = useState({ lights: [], plugs: [] });

  // conectamos al backend para obtener la lista de dispositivos y añadirla al useState
  useEffect(() => {
    connectSocket(); // Inicia la conexión de Socket.IO
    getDevicesState(setDevices); // Escucha los cambios en los dispositivos

    // Escucha los cambios en los dispositivos
    socket.on("devicesState", (data) => {
      setDevices({
        lights: data.lights,
        plugs: data.plugs,
      });
    });

    return () => {
      // Limpiar el listener al desmontar
      socket.off("devicesState");
    };
  }, []);
console.log(devices.lights);
  return (
    <div className={classes.container}>
      <Grid columns={{
        initial:"3",
        xl:"3",
      lg:"3",
        md:"2",
        sm: "1"
      }} 
      p="2">
        <Box p="2" size="3">
          <Flex direction="column" gap="2" size="3" justify="center">
            <Heading size="5">Escenas personales</Heading>
            <ButtonRa texto={"Escena 1"} />
            <ButtonRa texto={"Escena 2"} />
            <ButtonRa texto={"Escena 3"} />
            <ButtonRa texto={"Escena 4"} />
          </Flex>
        </Box>

        <Box p="2" size="3">
          <Flex
            direction="column"
            gap="1"
            p="1"
            justify="center"
            align="center"
          >
            <Heading size="5">Interruptores</Heading>
            <Grid columns={{
              xl:"3",
              lg:"2",
              md:"2",
            }} gap="4">
              {/**
               * <SwitchComp idName={"Oficina"}  deviceID={65537} />
              <SwitchComp idName={"Lampara Cris"} deviceID={65550} />
              <SwitchComp idName={"Lampara Iván"} deviceID={65551} />
              <SwitchComp idName={"Mesa 1"} deviceID={65562}/>
               */}

              {Object.values(devices.lights).map((device) => (
                <SwitchComp
                  key={device.id}
                  idName={device.name}
                  deviceID={device.id}
                  status={device.onOff}
                  deviceStatus={device.onOff}
                  colorTemperature={device.colorTemperature}
                  spectrum={device.spectrum}
                />
              ))}
            </Grid>
            
          </Flex>
        </Box>

        <Box size="3">
          <Flex
            direction="column"
            gap="2"
            p="1"
            justify="center"
            align="center"
          >
            <Heading size="5">Temperatura</Heading>
            <Grid columns="2" gap="2">
            {Object.values(devices.lights).map(
              (device) =>
                device.dimable ? ( // Si es "dimmable", renderiza el componente
                  <Dimmer
                    key={device.id} // Es importante añadir una "key" única al iterar en React
                    idName={device.name}
                    deviceID={device.id}
                    dimmer={device.brightness}
                    dimmerStatus={device.brightness}
                  />
                ) : null // Si no es "dimable", no renderiza nada
            )}
            </Grid>
              <TermoInfo idName={"Salón"} />
              <TermoInfo idName={"Exterior"} />

          </Flex>
        </Box>
      </Grid>
      <Grid columns="3"></Grid>
    </div>
  );
}
