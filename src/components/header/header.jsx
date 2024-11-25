import classes from "./Header.module.css";
import * as React from "react";
import Button from "../button/Button";
import Nav from "./nav/Nav";
import Time from "./Time/Time";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logoMark}>
        <img src="/img/logo.png" alt="Logo" className={classes.logo} />
        <h1>Casa APP</h1>
      </div>
      <Nav />
      <Time />
    </header>
  );
}
