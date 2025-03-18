import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/useStore";
import api from "../../../api/api";

const TablaDatos = () => {
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);
  const [personas, setPersonas] = useState([]);

  // 🚀 Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/buscarInternos/procesado8"); // 🔹 API del backend
        if (response.data) {
          setPersonas(response.data);
        }
      } catch (error) {
        console.error("Error al obtener datos de internos:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Seleccionar persona y redirigir
  const seleccionarPersona = (LLAVE) => {
    setLlave(LLAVE);
    navigate(`/capturista/formPaginas`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Lista de Reclusos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {personas.length > 0 ? (
            personas.map((persona) => (
              <tr key={persona.LLAVE}>
                <td>{persona.nombres.map(n => n.DNOMBRE).join(", ")}</td>
                <td>{persona.nombres.map(n => `${n.DPATERNO} ${n.DMATERNO}`).join(", ")}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => seleccionarPersona(persona.LLAVE)}
                  >
                    Subir Imágenes
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-danger">
                No hay registros disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDatos;
