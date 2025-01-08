import Dimmer from "../../components/dimmer/Dimmer";
import SwitchComp from "../../components/switch/Switch";
import TermoInfo from "../../components/termoInfo/TermoInfo";
import ButtonRa from "../../components/button/ButtonRa";
import classes from "./Dashboard.module.css";
import { Heading, Grid, Box, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { socket, connectSocket } from "../../services/socketService";
import {
  getDevicesState,
  getDevicesStateNow,
} from "../../services/deviceService";
import { verifyToken } from "../../services/dbconnect";
import { AuthContext } from "../../hooks/AuthContext";
import { useContext } from "react";
//importamos socket io
//const socket = io("http://localhost:4000");

export default function Dashboard() {
  // estado de los dispositivos importados desde el backend
  const [devices, setDevices] = useState({ lights: [], plugs: [] });
  const { id } = useContext(AuthContext);

  // Comprobamos token
  useEffect(() => {
    getDevicesStateNow(id); //Pedimos los datos al backend de los dispositivos
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirige al login
      window.location.href = "/";
    } else {
      // Verifica el token con el servidor
      verifyToken();
    }
  }, []);

  // conectamos al backend para obtener la lista de dispositivos y añadirla al useState
  useEffect(() => {
    console.log("Conectando al backend...");
    connectSocket(); // Inicia la conexión de Socket.IO

    // PEDIR DATOS A TRADFRI PORQUE SOLO LOS DA CUANDO HAY CAMBIOS!
    getDevicesState(setDevices, id); // Escucha los cambios en los dispositivos

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
  console.log(devices.plugs);

  // Filtrar dispositivos de tipo "switch"
  const switchDevices = devices.lights.filter(
    (device) => device.widgetType === "switch"
  );
  // Filtrar dispositivos de tipo "slider"
  const sliderDevices = devices.lights.filter(
    (device) => device.widgetType === "slider"
  );
  // Filtrar dispositivos sin clasificar
  const restoDevices = devices.lights.filter(
    (device) => device.widgetType === null
  );

  return (
    <div className={classes.container}>
      <Grid
        columns={{
          initial: "3",
          xl: "3",
          lg: "2",
          md: "2",
          sm: "1",
        }}
        p="2"
      >
        <Box p="2" size="3">
          <Flex
            direction="column"
            gap="1"
            p="1"
            justify="center"
            align="center"
          >
            <Heading size="5">Interruptores</Heading>
            <Grid
              columns={{
                xl: "3",
                lg: "2",
                md: "2",
                sm: "3"
              }}
              gap="4"
            >
              {switchDevices.map((device) => (
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
              {devices.plugs.map((device) => (
                <SwitchComp
                  key={device.id}
                  idName={device.name}
                  deviceID={device.id}
                  status={device.onOff}
                  deviceStatus={device.onOff}
                />
              ))}
            </Grid>
          </Flex>
        </Box>

        <Box p="2" size="3">
          <Flex
            direction="column"
            gap="2"
            p="1"
            justify="center"
            align="center"
          >
            <Heading size="5">Dimmers</Heading>
            <Grid columns="2" gap="2" justify="center" as="div">
              {sliderDevices.map((device) => (
                <Dimmer
                  key={device.id}
                  idName={device.name}
                  deviceID={device.id}
                  dimmer={device.brightness}
                  dimmerStatus={device.brightness}
                />
              ))}
            </Grid>
          </Flex>
        </Box>

        <Box p="2" size="3">
          <Flex direction="column" gap="2" size="3"  p="1" justify="center" align="center">
            <Heading size="5">Sin clasificar</Heading>
            <Grid columns="2" gap="2" justify="center" as="div">
              {restoDevices.map((device) => (
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
      </Grid>
      <Grid columns="3"></Grid>
    </div>
  );
}

/*
            <ButtonRa>Escena 1 </ButtonRa>
            <ButtonRa>Escena 2 </ButtonRa>
            <ButtonRa>Escena 3 </ButtonRa>
            <ButtonRa>Escena 4 </ButtonRa>
            <TermoInfo idName={"Salón"} />
            <TermoInfo idName={"Exterior"} />
            */
