import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/useStore";
import api from "../../../api/api";
import { motion } from "framer-motion";

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
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center text-primary fw-bold">Lista de Reclusos</h2>
      <motion.table
        className="table table-striped shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {personas.length > 0 ? (
            personas.map((persona) => (
              <motion.tr
                key={persona.LLAVE}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <td>{persona.nombres.map(n => n.DNOMBRE).join(", ")}</td>
                <td>{persona.nombres.map(n => `${n.DPATERNO} ${n.DMATERNO}`).join(", ")}</td>
                <td>
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => seleccionarPersona(persona.LLAVE)}
                  >
                    Subir Imágenes
                  </motion.button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-danger">
                No hay registros disponibles
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default TablaDatos;
