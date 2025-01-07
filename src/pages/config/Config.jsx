import React, { useEffect, useState, useContext } from "react";
import classes from "./Config.module.css";
import {
  getPersonalDevices,
  updatePersonalDevice,
} from "../../services/adminDevices";
import { AuthContext } from "../../hooks/AuthContext";
import ButtonRa from "../../components/button/ButtonRa";

export default function Config() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useContext(AuthContext);

  // Estado para almacenar datos temporales por dispositivo
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    async function fetchDevices() {
      try {
        const devicesList = await getPersonalDevices(id);
        setDevices(devicesList);

        // Inicializar estado temporal para cada dispositivo
        const initialTempData = devicesList.reduce((acc, device) => {
          acc[device.ID_device] = {
            newName: device.custom_name || "",
            newType: device.widget_type || "",
          };
          return acc;
        }, {});
        setTempData(initialTempData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDevices();
  }, [id]);

  const handleInputChange = (deviceId, field, value) => {
    setTempData((prev) => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        [field]: value,
      },
    }));
  };

  const handleUpdateDevice = async (deviceId) => {
    const { newName, newType } = tempData[deviceId];

    try {
      console.log(newType);
      const message = await updatePersonalDevice(
        id,
        deviceId,
        newName,
        newType
      );
      alert(message);

      // Actualizar los datos del dispositivo en la lista después del éxito
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.ID_device === deviceId
            ? { ...device, custom_name: newName, widget_type: newType }
            : device
        )
      );

      // Opcional: limpiar los datos temporales después de guardar
      setTempData((prev) => ({
        ...prev,
        [deviceId]: {
          newName,
          newType,
        },
      }));
    } catch (err) {
      console.log("Error updating device: ", err);
      alert("Error updating device: " + err);
    }
  };

  if (loading) return <p>Cargando dispositivos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={classes.container}>
      <h1>Configuración de dispositivos</h1>
      <table>
        <thead>
          <tr>
            <th>Dispositivo</th>
            <th>Nombre Personalizado</th>
            <th>Tipo de Widget</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.ID_device}>
              <td>{device.name_device}</td>
              <td>
                <input
                  type="text"
                  value={tempData[device.ID_device]?.newName || ""}
                  onChange={(e) =>
                    handleInputChange(
                      device.ID_device,
                      "newName",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <select
                  value={tempData[device.ID_device]?.newType || ""}
                  onChange={(e) =>
                    handleInputChange(
                      device.ID_device,
                      "newType",
                      e.target.value
                    )
                  }
                >
                  <option value="">Seleccionar</option>
                  {/* Mostrar la opción "slider" solo si el dispositivo es dimmable */}
                  {device.isDimmable && <option value="slider">Slider</option>}
                  <option value="switch">Switch</option>
                  {/*<option value="button">Button</option>*/}
                </select>
              </td>
              <td>
                <ButtonRa
                  size="2"
                  onClick={() => handleUpdateDevice(device.ID_device)}
                >
                  Guardar
                </ButtonRa>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
