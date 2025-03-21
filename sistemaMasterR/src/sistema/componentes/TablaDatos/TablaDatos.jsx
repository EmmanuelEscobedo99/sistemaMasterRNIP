import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/useStore";
import api from "../../../api/api";
import { motion, AnimatePresence } from "framer-motion";

const TablaDatos = () => {
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);
  const [personas, setPersonas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 🔹 Número de elementos por página

  // 🚀 Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/buscarInternos/procesado2");
        if (response.data) {
          setPersonas(response.data);
        }
      } catch (error) {
        console.error("Error al obtener datos de internos:", error);
      }
    };
    fetchData();
  }, []);

  // 🔹 Calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personas.slice(indexOfFirstItem, indexOfLastItem);

  // 🔹 Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <AnimatePresence mode="wait">
          <motion.tbody
            key={currentPage} // 🔹 Clave para animaciones entre páginas
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentItems.length > 0 ? (
              currentItems.map((persona) => (
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
          </motion.tbody>
        </AnimatePresence>
      </motion.table>

      {/* 🔹 Paginación */}
      <div className="d-flex justify-content-center mt-3">
        <motion.button
          className="btn btn-outline-primary mx-2"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Anterior
        </motion.button>
        <span className="fw-bold mx-3">Página {currentPage} de {Math.ceil(personas.length / itemsPerPage)}</span>
        <motion.button
          className="btn btn-outline-primary mx-2"
          disabled={indexOfLastItem >= personas.length}
          onClick={() => paginate(currentPage + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Siguiente
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TablaDatos;
