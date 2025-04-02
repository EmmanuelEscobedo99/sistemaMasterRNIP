import React, { useEffect, useState } from "react";
import useStore from "../../../app/useStore";
import { motion } from "framer-motion";

const B12Rechazados = () => {
  const [resultados, setResultados] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const resultadosPorPagina = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await useStore.getState().cargarInternosBloque12Rechazados();
        const data = useStore.getState().internosBloque12;

        setResultados(data);
        setResultadosFiltrados(data);
      } catch (error) {
        console.error("Error al obtener datos del Bloque 12 rechazados:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
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
          <h2 className="fw-bold mb-1">Registros del bloque 1 y 2 rechazados</h2>
          <p className="text-secondary mb-4">Estos registros tienen el estado de PROCESADO = 8.</p>

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
                  <th className="px-3">LLAVE</th>
                </tr>
              </thead>
              <tbody>
                {resultadosPaginados.length > 0 ? (
                  resultadosPaginados.map(({ nombres, LLAVE }, idx) => (
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
                      <td className="px-3">{LLAVE}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center text-danger py-3">
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

export default B12Rechazados;
