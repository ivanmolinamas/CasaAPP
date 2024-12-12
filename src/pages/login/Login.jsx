import classes from "./Login.module.css";
import {
  Heading,
  Grid,
  Box,
  Flex,
  Card,
  Text,
  Button,
  Tabs,
} from "@radix-ui/themes";
//import * as Tabs from "@radix-ui/react-tabs";
import "@radix-ui/themes/styles.css";
import { login, verifyToken } from "../../services/dbconnect";
import { useState, useEffect,} from "react";
import { useNavigate } from 'react-router-dom';  // Importa useNavigate



export default function Dashboard() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook para redirigir



  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user, password);
    login(user, password)
      .then((data) => {
        console.log("Login completado:", data);
      // Redirigir a /dashboard
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log("Error en el login: " + error);
        setError(error)
      });
  };

  // Llamar a verifyToken en el momento de cargar la página para ver si el usuario está autenticado
useEffect(() => {
  verifyToken();
}, []);

  const ErrorMessage = () => {
    return (
      <p>Error al acceder, revise usuario y contraseña</p>
    )
  }

  return (
    <>
      <div className={classes.container}>
        <Tabs.Root className={classes.Root} defaultValue="tab1">
          <Tabs.List className={classes.List} aria-label="gestiona tu cuenta">
            <Tabs.Trigger className={classes.Trigger} value="tab1">
              Acceso
            </Tabs.Trigger>
            <Tabs.Trigger className={classes.Trigger} value="tab2">
              Crear cuenta
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={classes.Content} value="tab1">
            <p className={classes.Text}>Acceso con tu cuenta.</p>
            <fieldset className={classes.Fieldset}>
              <label className={classes.Label} htmlFor="name">
                Usuario
              </label>
              <input
                className={classes.Input}
                id="name"
                defaultValue="Tu nombre"
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
                defaultValue="password"
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
          <Tabs.Content className={classes.Content} value="tab2">
            <p className={classes.Text}>Crea una cuenta de usuario.</p>
            <fieldset className={classes.Fieldset}>
              <label className={classes.Label} htmlFor="newUser">
                Nombre de usuario
              </label>
              <input className={classes.Input} id="newUser" type="password" />
            </fieldset>
            <fieldset className={classes.Fieldset}>
              <label className={classes.Label} htmlFor="newPassword">
                Contraseña
              </label>
              <input
                className={classes.Input}
                id="newPassword"
                type="password"
              />
            </fieldset>
            <fieldset className={classes.Fieldset}>
              <label className={classes.Label} htmlFor="newMail">
                Email
              </label>
              <input className={classes.Input} id="newMail" type="email" />
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button className={`${classes.Button} green`}>
                Crear cuenta
              </button>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}

/**
 * 
 * <Box maxWidth="440px" height="300px">
      <Card >

      <Flex gap="9" align="center"justify="center" >
			<Box>
        <form>
				
			<Text as="div" size="5" weight="bold">
					Acceso de usuarios
				</Text>
				<Text as="div" size="2" color="gray">
					Usuario
				</Text>
          <input type="text" className={classes.input} />
				<Text as="div" size="2" color="gray">
					Contraseña
				</Text>
          <input type="password" className={classes.input} />
          <br />
				<Button >Entrar</Button>
        </form>
			</Box>
		</Flex>
      </Card>
      </Box>
 */
