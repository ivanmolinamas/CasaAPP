import classes from "./Config.module.css";
import React, { useEffect, useState } from "react";
import { getPersonalDevices, updatePersonalDevice } from "../../services/adminDevices";
import { AuthContext } from "../../hooks/AuthContext";
import { useContext } from "react";

export default function Config() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useContext(AuthContext);


  useEffect(() => {
    // Obtener dispositivos al cargar el componente
    async function fetchDevices() {
      console.log("id: ", id);
      try {
        const devicesList = await getPersonalDevices(id);
        setDevices(devicesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDevices();
  }, []);

  const handleUpdateDevice = async (deviceId, customName, widgetType) => {
    try {
      const message = await updatePersonalDevice(deviceId, customName, widgetType);
      alert(message);
      // Actualiza la lista de dispositivos localmente después del éxito
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.ID_device === deviceId
            ? { ...device, custom_name: customName, widget_type: widgetType }
            : device
        )
      );
    } catch (err) {
      alert("Error al actualizar el dispositivo: " + err.message);
    }
  };

  if (loading) return <p>Cargando dispositivos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Gestión de dispositivos</h1>
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
                  defaultValue={device.custom_name || ""}
                  onBlur={(e) =>
                    handleUpdateDevice(
                      device.ID_device,
                      e.target.value,
                      device.widget_type || ""
                    )
                  }
                />
              </td>
              <td>
                <select
                  defaultValue={device.widget_type || ""}
                  onChange={(e) =>
                    handleUpdateDevice(
                      device.ID_device,
                      device.custom_name || "",
                      e.target.value
                    )
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="slider">Slider</option>
                  <option value="switch">Switch</option>
                  <option value="button">Button</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateDevice(
                      device.ID_device,
                      device.custom_name || "",
                      device.widget_type || ""
                    )
                  }
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
