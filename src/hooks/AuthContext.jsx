import { createContext, useState, useEffect} from "react";
import { verifyToken } from "../services/dbconnect";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null); // Guarda el usuario autenticado
    const [rol, setRol] = useState(null); // Guarda el usuario autenticado
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  
    // Función para iniciar sesión
    const login = (token, user, rol) => {
     // guardamos los datos del usuario
      setAuthToken(token);
      setUser(user);
      setRol(rol);
      /*setAuthToken({
        user: user,
        rol: rol,
        token: token,
      });*/
      console.log("valores de token:",authToken, "user:",user,"rol:" , rol);
      localStorage.setItem("token", token);
    };
  
    // Función para cerrar sesión
    const logout = () => {
      setAuthToken(null);
      setUser(null);
      setRol(null);
      localStorage.removeItem("token");
    };
  
    // Verificar el token al cargar el contexto
    useEffect(() => {
      const checkToken = async () => {
        try {
          setLoading(true); // Comienza la carga
          const userData = await verifyToken(); // Verifica el token
          setUser(userData); // Guarda los datos del usuario si el token es válido
          console.log("Usuario autenticado:", userData);
        } catch (error) {
          console.error(error.message);
          logout(); // Cierra sesión si el token es inválido
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
      <AuthContext.Provider value={{ authToken, user, rol, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  }