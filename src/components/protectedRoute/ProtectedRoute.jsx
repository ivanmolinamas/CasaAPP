import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import classes from "./ProtectedRoute.module.css";

function ProtectedRoute({ children }) {
    const { authToken, loading } = useContext(AuthContext);



    if (loading) {
      // se devuelve un spinner cargando
      return (
        <div className={classes.container}>
          <div className={classes.loadingSpinner}></div>
          <h3 className={classes.texto}> Cargando... </h3>
        </div>
      )
    }
    if (!authToken) {
      // Si no hay token, redirige a la página de login
      return <Navigate to="/" />;
      
    }
  
    return children ? children : <Outlet />; // Si hay token, muestra el contenido protegido
  }
  
  export default ProtectedRoute;