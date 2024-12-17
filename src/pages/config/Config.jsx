import classes from "./Config.module.css";





export default function Config() {

  // Comprobamos token
useEffect(() => {
  getDevicesStateNow(); //Pedimos los datos al backend de los dispositivos
  const token = localStorage.getItem('token');
  if (!token) {
    // Si no hay token, redirige al login
    window.location.href = '/';
  } else {
    // Verifica el token con el servidor
    verifyToken();
  }
}, []);


  return (
    <div className={classes.container}>
      <h1>Configuracion</h1>
    </div>
  );
}