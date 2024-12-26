import Header from "../header/Header";
import Content from "../content/Content";
import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Auto from "../../pages/auto/Auto";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

export default function Layout() {
  return (
    <main className={classes.main}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.content}>
        <Content>
          <Outlet /> {/* Renderiza el contenido de la ruta actual */}
        </Content>
      </div>
    </main>
  );
}
