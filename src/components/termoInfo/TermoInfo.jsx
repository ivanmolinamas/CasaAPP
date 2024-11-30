import classes from "./TermoInfo.module.css";
import { Box, Heading, Flex, Text } from "@radix-ui/themes";

export default function TermoInfo({ idName }) {
  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="center" gap="3">
        <Flex direction="column" gap="0" p="1" justify="center" align="center">
          <Heading size="3">{idName}</Heading>
          <div className={classes.status}>
            <Heading size="9" color="green" align={"center"}>22º</Heading>
          </div>
          <Text size={"1"}>Hace 5 min</Text>
        </Flex>
      </Box>
    </div>
  );
}
