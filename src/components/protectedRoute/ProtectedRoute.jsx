import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";

function ProtectedRoute({ children }) {
    const { authToken, loading } = useContext(AuthContext);
    if (loading) {
      return <p>Cargando...</p>; // Muestra un loader mientras se verifica el token
    }
    if (!authToken) {
      // Si no hay token, redirige a la página de login
      return <Navigate to="/" />;
    }
  
    return children ? children : <Outlet />; // Si hay token, muestra el contenido protegido
  }
  
  export default ProtectedRoute;