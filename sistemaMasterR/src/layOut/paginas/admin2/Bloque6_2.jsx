import React, { useEffect, useState } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLlave } from "../../../sistemaAdmin/reducers/slice/Llave/LlaveSlice";
import { setIdAlterna } from "../../../sistemaAdmin/reducers/slice/IdAlterna/IdAlternaSlice";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Bloque6_2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const { internosNombresBloque6, cargarInternosNombresBloque6 } = useStore();
  const [resultados, setResultados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina] = useState(10);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Llamar la función para cargar los datos
        await cargarInternosNombresBloque6();

        // Asegurar que la pantalla de carga dure al menos 2 segundos
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos

        // Procesar los datos después de esperar
        const agrupados = internosNombresBloque6.reduce((acc, { DNOMBRE, DPATERNO, DMATERNO, LLAVE, ID_ALTERNA }) => {
          if (!acc[LLAVE]) {
            acc[LLAVE] = { nombres: [], LLAVE, ID_ALTERNA };
          }
          acc[LLAVE].nombres.push(`${DNOMBRE} ${DPATERNO} ${DMATERNO}`);
          return acc;
        }, {});
        const resultadosAgrupados = Object.values(agrupados);
        setResultados(resultadosAgrupados);
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      } finally {
        // Cambiar a loading = false solo después de los 2 segundos
        setLoading(false);
      }
    };

    cargarDatos();
  }, [internosNombresBloque6, cargarInternosNombresBloque6]);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = resultados.filter((registro) =>
      registro.nombres.join(" ").toLowerCase().includes(valor)
    );

    setResultados(filtrados);
    setPaginaActual(1);
  };

  const handleSeleccionar = (LLAVE, ID_ALTERNA) => {
    dispatch(setLlave(LLAVE));
    dispatch(setIdAlterna(ID_ALTERNA));
    navigate(`/admin2/verificar6_2`);
  };

  const indiceFinal = paginaActual * resultadosPorPagina;
  const indiceInicial = indiceFinal - resultadosPorPagina;
  const resultadosPaginados = resultados.slice(indiceInicial, indiceFinal);

  const handleSiguiente = () => {
    if (paginaActual < Math.ceil(resultados.length / resultadosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <div className="container-fluid mt-4">
      {/* Pantalla de carga */}
      {loading ? (
        <>
          <img
            src="../../../../public/SSP2.jpeg" // Cambia esta URL por tu imagen de carga
            alt="Cargando..."
            width="400px" // Ajusta el tamaño de la imagen
            style={{
              display: "block",
              margin: "auto",  // Centrado horizontal
              marginTop: "20vh",  // Espaciado desde la parte superior
            }}
          />
          <p
            style={{
              color: "#FFFFFF",
              textAlign: "center",
              marginTop: "20px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Cargando registros...
          </p>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            color: "#E5E7EB",
            backgroundColor: "#0A0A0A",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <h2 className="fw-bold mb-1">Registros del Bloque 6</h2>
          <p className="text-secondary mb-4">Aquí se muestran los registros correspondientes al Bloque 6.</p>

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
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-dark text-uppercase">
                <tr>
                  <th className="px-3">Nombre(s)</th>
                  <th className="text-center px-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {resultadosPaginados.map(({ nombres, LLAVE, ID_ALTERNA }) => (
                  <motion.tr
                    key={ID_ALTERNA}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <td className="px-3">
                      {nombres.map((n, i) => (
                        <div key={i} className="py-1">
                          {n}
                        </div>
                      ))}
                    </td>
                    <td className="text-center px-3">
                      <motion.button
                        className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-2"
                        style={{ minWidth: "120px" }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSeleccionar(LLAVE, ID_ALTERNA)}
                      >
                        <FaSearch /> Ver
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
                {resultadosPaginados.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center text-danger py-3">
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
              onClick={handleAnterior}
              disabled={paginaActual === 1}
            >
              ◀ Anterior
            </motion.button>
            <motion.button
              className="btn btn-outline-light btn-sm px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSiguiente}
              disabled={paginaActual === Math.ceil(resultados.length / resultadosPorPagina)}
            >
              Siguiente ▶
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Bloque6_2;
