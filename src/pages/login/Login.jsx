import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import classes from "./Login.module.css";
import { Tabs } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { login, verifyToken, crearUsuarioNuevo } from "../../services/dbconnect";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Accede al contexto aquí


  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  })


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user, password);

    login(user, password)
      .then((data) => {
        console.log("Login completado:", data);
        const token = data.token; // Vamos a guardar el token que llega del backend
        const user = data.user; //guardamos el nombre de usuario
        const rol = data.rol; // Guardamos el rol que tiene el usuario para gestionar sus permisos
        const id = data.id; // Guardamos el rol que tiene el usuario para gestionar sus permisos
        authContext.login(token, user, rol,id ); // LLamamos a la funcion que guardara estos datos 
        console.log("Token guardado en el contexto:", token);
        navigate("/dashboard"); //te lleva a dashboard
      })
      .catch((error) => {
        console.log("Error en el login: " + error);
        setError(error || "Error inesperado");
      });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    console.log(newUser);

    crearUsuarioNuevo(newUser.name ,newUser.password,newUser.email )
      .then((data) => {
        console.log("usuario creado correctamente", data)
        console.log(data.user)
        const newUserName = data.user;
        setSuccessMessage(`Usuario "${newUserName}" creado correctamente.`);
        setError(null); // Limpia el mensaje de error si existía
      })
      .catch((error) => {
        console.log("Error en el login: " + error);
        setError(error || "Error inesperado");
      });
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token)
        .then(() => {
          navigate("/dashboard"); // Si el token es válido, redirigir
        })
        .catch(() => {
          console.log("Token inválido o expirado");
          localStorage.removeItem("token"); // Eliminar el token si no es válido
        });
    }
  }, [navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.centralContainer}>
        <div className={classes.logoContainer}>
        <img src="./img/logov1.png" alt="logo" className={classes.logo} />
          <h1 className={classes.title}>CasaApp</h1>
        </div>
      
      <Tabs.Root className={classes.Root} defaultValue="tab1">
        <Tabs.List className={classes.List} aria-label="gestiona tu cuenta">
          <Tabs.Trigger className={classes.Trigger} value="tab1">
            <span className={classes.tabColor}>Acceso</span>
          </Tabs.Trigger>
          <Tabs.Trigger className={classes.Trigger} value="tab2">
            <span className={classes.tabColor}>Crear cuenta</span>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className={classes.Content} value="tab1">
          <p className={classes.Text}>Acceso con tu cuenta</p>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Usuario
            </label>
            <input
              className={classes.Input}
              id="name"
              onChange={(e) => setUser(e.target.value)}
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="password">
              Contraseña
            </label>
            <input
              className={classes.Input}
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={classes.error}>{error}</p>}
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button
              className={`${classes.Button} green`}
              type="submit"
              onClick={handleLogin}
            >
              Acceder
            </button>
          </div>
        </Tabs.Content>


        {/** crear usuario */}
        <Tabs.Content className={classes.Content} value="tab2">
          <p className={classes.Text}>Crea una cuenta de usuario</p>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="newUser">
              Nombre de usuario
            </label>
            <input className={classes.Input} id="newUser" type="text"
            onChange={(e) => 
              setNewUser((prev) => ({
              ...prev,
              name: e.target.value, // Actualiza solo el campo "name"
            }))
          }
            
              />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="newPassword">
              Contraseña
            </label>
            <input
              className={classes.Input}
              id="newPassword"
              type="password"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  password: e.target.value, // Actualiza solo el campo "password"
                }))
              }
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="newMail">
              Email
            </label>
            <input 
            className={classes.Input} 
            id="newMail" 
            type="email" 
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                email: e.target.value, // Actualiza solo el campo "email"
              }))
            }
            />
          {error && <p className={classes.error}>{error}</p>}
          {successMessage && <p className={classes.success}>{successMessage}</p>}
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button 
            className={`${classes.Button} green`}
            onClick={handleCreateUser}
            >Crear cuenta</button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
      </div>
    </div>
  );
}
