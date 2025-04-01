import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/useStore";
import api from "../../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const B6Rechazados = () => {
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);
  const [personas, setPersonas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/buscarInternos/procesado2");
        setPersonas(response.data || []);
      } catch (error) {
        console.error("Error al obtener datos de internos:", error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchData();
  }, []);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const personasFiltradas = personas.filter((persona) =>
    persona.nombres
      .map((n) => `${n.DNOMBRE} ${n.DPATERNO} ${n.DMATERNO}`.toLowerCase())
      .join(" ")
      .includes(busqueda)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personasFiltradas.slice(indexOfFirstItem, indexOfLastItem);

  const seleccionarPersona = (LLAVE) => {
    setLlave(LLAVE);
    navigate(`/capturista/formPaginas`);
  };

  return (
    <>
      {loading ? (
        <motion.div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "100vh", backgroundColor: "#0A0A0A" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img src="../../../../public/SSP2.jpeg" alt="Cargando..." width="300px" />
          <p className="text-white mt-3 fs-5 fw-semibold">Cargando datos...</p>
        </motion.div>
      ) : (
        <motion.div
          className="container-fluid mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            color: "#E5E7EB",
            backgroundColor: "#0A0A0A",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h2 className="fw-bold mb-1">Registros del bloque 6 rechazados</h2>
          <p className="text-secondary mb-4">Selecciona un interno para editar imágenes.</p>

          <input
            type="text"
            className="form-control mb-4"
            placeholder="🔍 Escribe un nombre..."
            value={busqueda}
            onChange={handleBuscar}
            style={{
              backgroundColor: "#1F2937",
              color: "#E5E7EB",
              border: "1px solid #374151",
              padding: "12px",
            }}
          />

          <div className="table-responsive">
            <motion.table
              className="table table-dark table-hover align-middle w-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              
            >
              <thead className="bg-dark text-uppercase">
                <tr>
                  <th className="px-3">Nombre(s)</th>
                  <th className="px-3">Apellidos</th>
                  <th className="text-center px-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((persona) => (
                    <motion.tr
                      key={persona.LLAVE}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="px-3">
                        {persona.nombres.map((n, i) => (
                          <div key={i}>{n.DNOMBRE}</div>
                        ))}
                      </td>
                      <td className="px-3">
                        {persona.nombres.map((n, i) => (
                          <div key={i}>
                            {n.DPATERNO} {n.DMATERNO}
                          </div>
                        ))}
                      </td>
                      <td className="text-center px-3">
                        <motion.button
                          className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-2"
                          style={{ minWidth: "150px" }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => seleccionarPersona(persona.LLAVE)}
                        >
                          <FaUpload /> Subir Imágenes
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-danger py-3">
                      No se encontraron registros
                    </td>
                  </tr>
                )}
              </tbody>
            </motion.table>
          </div>

          {/* Paginación */}
          <div className="d-flex justify-content-center mt-4 gap-3">
            <motion.button
              className="btn btn-outline-light btn-sm px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀ Anterior
            </motion.button>
            <motion.button
              className="btn btn-outline-light btn-sm px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= personasFiltradas.length}
            >
              Siguiente ▶
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default B6Rechazados;
