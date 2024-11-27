import SwitchComp from "../../components/switch/Switch";
import classes from "./Dashboard.module.css";
import { Heading, Text, Grid, Card } from "@radix-ui/themes";

export default function Dashboard() {
  return (
    <div className={classes.container}>
      <Grid columns="3">
        <Card variant="classic" size="3">
          <Heading size="5">Luz estudio 1</Heading>
          <SwitchComp idName={"luz 1"}/>
          
        </Card>
        <Card variant="classic" size="3">
          <Text>Controla los dispositivos de tu casa</Text>
          <SwitchComp idName={"luz 2"} />
          
        </Card>
        <Card  size="3" >
          <SwitchComp idName={"luz 3"} />

        </Card>
      </Grid>
      <Grid columns="3">
      </Grid>
    </div>
  );
}
