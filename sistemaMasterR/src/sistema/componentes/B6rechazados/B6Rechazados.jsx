import React, { useEffect, useState } from "react";
import useStore from "../../../app/useStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const B6Rechazados = () => {
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);
  const [resultados, setResultados] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const resultadosPorPagina = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos de los internos y errores
        const internosResponse = await useStore.getState().cargarInternosBloque11();
        const internos = useStore.getState().internosBloque11;

        const erroresResponse = await useStore.getState().cargarErroresB6();
        const errores = useStore.getState().erroresB6;

        // Agrupar los registros por LLAVE
        const agrupados = internos.reduce((acc, { DNOMBRE, DPATERNO, DMATERNO, LLAVE, ID_ALTERNA }) => {
          if (!acc[LLAVE]) {
            acc[LLAVE] = {
              nombres: [],
              LLAVE,
              ID_ALTERNA,
              descripcion: new Set(), // Usamos un Set para evitar duplicados
              formulario: [],
              campo: [],
              idBloqueFuncional: "",
            };
          }
          acc[LLAVE].nombres.push({ DNOMBRE, DPATERNO, DMATERNO });

          // Buscar las descripciones relacionadas con esta LLAVE
          const erroresDeLLAVE = errores.filter(d => d.LLAVE === LLAVE);
          if (erroresDeLLAVE.length > 0) {
            erroresDeLLAVE.forEach((error) => {
              acc[LLAVE].descripcion.add(error.descripcion);  // Usamos Set para evitar duplicados
              acc[LLAVE].formulario.push(error.FORMULARIO);  // Guardamos todos los formularios
              acc[LLAVE].campo.push(error.CAMPO);  // Guardamos todos los campos
              acc[LLAVE].idBloqueFuncional = error.ID_BLOQUE_FUNCIONAL;  // Asegúrate de que cada error tiene el mismo ID de bloque funcional.
            });
          }

          return acc;
        }, {});

        // Convertimos el objeto de agrupación en un array
        const resultadosAgrupados = Object.values(agrupados);
        setResultados(resultadosAgrupados);
        setResultadosFiltrados(resultadosAgrupados);
      } catch (error) {
        console.error("Error al obtener datos de internos:", error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchData();
  }, []);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = resultados.filter((registro) =>
      registro.nombres
        .map((n) => `${n.DNOMBRE} ${n.DPATERNO} ${n.DMATERNO}`.toLowerCase())
        .some((nombre) => nombre.includes(valor))
    );

    setResultadosFiltrados(filtrados);
    setPaginaActual(1);
  };

  const handleSeleccionar = (LLAVE) => {
    setLlave(LLAVE);
    navigate("/capturista/mostrarimagenes");
  };

  const indiceFinal = paginaActual * resultadosPorPagina;
  const indiceInicial = indiceFinal - resultadosPorPagina;
  const resultadosPaginados = resultadosFiltrados.slice(indiceInicial, indiceFinal);

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleSiguiente = () => {
    if (paginaActual < Math.ceil(resultadosFiltrados.length / resultadosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  // Función para garantizar que siempre estamos trabajando con arrays
  const ensureArray = (value) => {
    return Array.isArray(value) ? value : [value];
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
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-dark text-uppercase">
                <tr>
                  <th className="px-3">Nombre(s)</th>
                  <th className="px-3">Formulario</th>
                  <th className="px-3">Campo</th>
                  <th className="text-center px-3">Motivo De Rechazo</th>
                  <th className="px-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {resultadosPaginados.length > 0 ? (
                  resultadosPaginados.map(({ nombres, LLAVE, descripcion, formulario, campo, idBloqueFuncional }, idx) => (
                    <motion.tr
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="px-3">
                        {nombres.map((n, i) => (
                          <div key={i}>{`${n.DNOMBRE} ${n.DPATERNO} ${n.DMATERNO}`}</div>
                        ))}
                      </td>
                      <td>{ensureArray(formulario).join(", ")}</td> {/* Usamos la función para asegurarnos de que formulario es un array */}
                      <td>{ensureArray(campo).join(", ")}</td> {/* Usamos la función para asegurarnos de que campo es un array */}
                      <td style={{ color: 'red' }}>
                        {Array.from(descripcion).join(", ")}  {/* Convertimos el Set a un Array y lo concatenamos */}
                      </td>
                      <td className="text-center px-3">
                        <motion.button
                          className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-2"
                          style={{ minWidth: "150px" }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSeleccionar(LLAVE)}
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
              disabled={paginaActual === Math.ceil(resultadosFiltrados.length / resultadosPorPagina)}
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
