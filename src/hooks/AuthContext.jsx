import { createContext, useState, useEffect} from "react";
import { verifyToken } from "../services/dbconnect";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null); // Guarda el usuario autenticado
    const [rol, setRol] = useState(null); // Guarda el usuario autenticado
    const [id, setId] = useState(null); // Guarda el usuario autenticado
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga

    

    // Función para iniciar sesión
    const login = (token, user, rol, id) => {
     // guardamos los datos del usuario
      setAuthToken(token);
      setUser(user);
      setRol(rol);
      setId(id);
      localStorage.setItem("token", token);
      console.log("Login exitoso:", { token, user, rol, id });
    };
  
    // Función para cerrar sesión
    const logout = () => {
      console.log("logout desde AuthContext");
      setAuthToken(null);
      setUser(null);
      setRol(null);
      localStorage.removeItem("token");
      navigate("/login"); // Redirigimos a la pagina login
    };
  
    // Verificar el token al cargar el contexto
    useEffect(() => {
      const checkToken = async () => {
        try {
          setLoading(true); // Comienza la carga
          const userData = await verifyToken(); // Verifica el token
          setUser(userData.username); // Guarda los datos del usuario si el token es válido
          setRol(userData.rol); // Guarda los datos del usuario si el token es válido
          setId(userData.userId); // Guarda los datos del ID usuario si el token es válido
          console.log("userData:", userData);
        } catch (error) {
          console.error(error.message);
          logout(); // Cierra sesión si el token es inválido
          navigate("/login"); // Redirigimos a la pagina login
        } finally {
          setLoading(false); // Finaliza la carga
        }
      };
  
      if (authToken) {
        checkToken();
      } else {
        setLoading(false); // Si no hay token, finaliza la carga
      }
    }, [authToken]);
  
    return (
      <AuthContext.Provider value={{ authToken, user, id, rol, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  }