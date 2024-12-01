import Dimmer from "../../components/dimmer/Dimmer";
import SwitchComp from "../../components/switch/Switch";
import TermoInfo from "../../components/termoInfo/TermoInfo";
import ButtonRa from "../../components/button/ButtonRa";
import classes from "./Dashboard.module.css";
import { Heading, Grid, Box, Flex } from "@radix-ui/themes";

export default function Dashboard() {
  return (
    <div className={classes.container}>
      <Grid columns="3" p="2">
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
            <Grid columns="2" gap="2">
              <SwitchComp idName={"Oficina"}  deviceID={65537} />
              <SwitchComp idName={"Lampara Cris"} deviceID={65550} />
              <SwitchComp idName={"Lampara Iván"} deviceID={65551} />
              <SwitchComp idName={"luz 4"} />
            </Grid>

            <Dimmer idName={"Oficina"} deviceID={65537} />
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
            <TermoInfo idName={"Salón"} />
            <TermoInfo idName={"Exterior"} />
            </Grid>
          </Flex>
        </Box>
      </Grid>
      <Grid columns="3"></Grid>
    </div>
  );
}
