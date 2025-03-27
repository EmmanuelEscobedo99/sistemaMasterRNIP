import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/useStore";
import api from "../../../api/api";
import { motion, AnimatePresence } from "framer-motion";

const TablaDatos = () => {
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);
  const [personas, setPersonas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Estado de carga
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/buscarInternos/procesado2");
        if (response.data) {
          setPersonas(response.data);
        }
      } catch (error) {
        console.error("Error al obtener datos de internos:", error);
      } finally {
        // Simulamos un retraso de 2 segundos para la carga
        setTimeout(() => {
          setLoading(false); // Cambiar el estado de carga a falso después de 2 segundos
        }, 2000);
      }
    };
    fetchData();
  }, []);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);
    setCurrentPage(1); // Reinicia a la primera página si se busca
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const seleccionarPersona = (LLAVE) => {
    setLlave(LLAVE);
    navigate(`/capturista/formPaginas`);
  };

  return (
    <>
      {/* Pantalla de carga */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            backgroundColor: "transparent", // Fondo transparente
            flexDirection: "column",
            justifyContent: "center", // Centrar el contenido
          }}
        >
          <img
            src="../../../../public/SSP2.jpeg" // Cambia esta URL por tu imagen de carga
            alt="Cargando..."
            width="400px" // Haciendo la imagen más grande
          />
          <p
            style={{
              color: "black",
              marginTop: "20px",
              fontSize: "24px", // Aumentando el tamaño de la fuente
              fontWeight: "bold", // Haciendo el texto más grueso
            }}
          >
            Cargando datos...
          </p>
        </motion.div>
      ) : (
        // Solo se muestra el contenido de la tabla después de cargar los datos
        <motion.div
          className="container mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: "#0A0A0A",
            color: "#E5E7EB",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 className="fw-bold" style={{ color: "#FFFFFF", textAlign: "left" }}>
            Lista de Reclusos
          </h2>
          <p style={{ color: "#D1D5DB", textAlign: "left" }}>
            Aquí se muestran los registros correspondientes al sistema.
          </p>

          <input
            type="text"
            className="form-control my-3"
            placeholder="🔍 Escribe un nombre..."
            value={busqueda}
            onChange={handleBuscar}
            style={{
              backgroundColor: "#1F2937",
              color: "white",
              border: "1px solid #374151",
            }}
          />

          <motion.table
            className="table table-dark table-bordered"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              height: "550px", // Establecer una altura fija
              overflowY: "auto", // Hacer la tabla desplazable verticalmente si es necesario
            }}
          >
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {currentItems.length > 0 ? (
                  currentItems.map((persona) => (
                    <motion.tr key={persona.LLAVE}>
                      <td>{persona.nombres.map((n) => n.DNOMBRE).join(", ")}</td>
                      <td>
                        {persona.nombres
                          .map((n) => `${n.DPATERNO} ${n.DMATERNO}`)
                          .join(", ")}
                      </td>
                      <td className="text-center">
                        <motion.button
                          className="btn btn-primary btn-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => seleccionarPersona(persona.LLAVE)}
                          style={{
                            backgroundColor: "#2563EB",
                            border: "none",
                          }}
                        >
                          Subir Imágenes
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-danger">
                      No se encontraron registros
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </motion.table>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="fw-bold text-white">
              Página {currentPage} de{" "}
              {Math.ceil(personasFiltradas.length / itemsPerPage)}
            </span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= personasFiltradas.length}
            >
              Siguiente
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default TablaDatos;
