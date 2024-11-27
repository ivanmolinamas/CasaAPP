import Header from "../header/Header";
import Content from "../content/Content";
import classes from "./Layout.module.css";
import Dashboard from "../../pages/dashboard/dashboard";
import { Routes, Route } from "react-router-dom";
import Auto from "../../pages/auto/Auto";
import Config from "../../pages/config/Config";

export default function Layout() {
  return (
    <main className={classes.main}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.content}>
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/automatizaciones" element={<Auto />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </Content>
      </div>
    </main>
  );
}
