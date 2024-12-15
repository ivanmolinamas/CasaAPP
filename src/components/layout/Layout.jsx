import Header from "../header/Header";
import Content from "../content/Content";
import classes from "./Layout.module.css";
import Dashboard from "../../pages/dashboard/dashboard";
import Login from "../../pages/login/Login";
import { Routes, Route, Outlet } from "react-router-dom";
import Auto from "../../pages/auto/Auto";
import Config from "../../pages/config/Config";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

export default function Layout() {
  /*
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/automatizaciones" element={<Auto />} />
    <Route path="/config" element={<Config />} />
  </Route>
  <Route path="*" element={<Login />} />
</Routes>*/
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
