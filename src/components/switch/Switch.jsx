import classes from "./SwitchComp.module.css";
import * as Switch from "@radix-ui/react-switch";
import { Box, Heading } from "@radix-ui/themes";

export default function SwitchComp({idName}) {
  return (
    <div className={classes.container}>
          <Box display="flex" alignItems="center" gap="3">
            <form>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  className={classes.Label}
                  htmlFor="luz1"
                  style={{ paddingRight: 15 }}
                >
                  <Heading size="4">{idName}</Heading>
                </label>
                <Switch.Root 
                className={classes.Root} 
                id="luz1"
                onCheckedChange={() => console.log("checked", idName)}
                >
                  <Switch.Thumb className={classes.Thumb} />
                </Switch.Root>
              </div>
            </form>
          </Box>

    </div>
  );
}
