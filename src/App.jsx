import "./App.css";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { AuthProvider } from "./hooks/AuthContext";

import Dashboard from "./pages/dashboard/dashboard";
import Config from "./pages/config/Config";
import Auto from "./pages/auto/Auto";
import Admin from "./pages/admin/Admin";

function App() {
  //<Layout />
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Estas rutas se renderizarán dentro del Layout */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="configuracion" element={<Config />} />
            <Route path="automatizacion" element={<Auto />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          {/* Ruta por defecto (404) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
