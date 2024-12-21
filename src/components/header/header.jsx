import classes from "./Header.module.css";
import Nav from "./nav/Nav";
import Time from "./Time/Time";
import {Heading} from  "@radix-ui/themes";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logoMark}>
        <img src="/img/logov1.png" alt="Logo" className={classes.logo} />
        <Heading color="accent" >Casa APP</Heading>
      </div>
      <Nav />
      <Time />
    </header>
  );
}
