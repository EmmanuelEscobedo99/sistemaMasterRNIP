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
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina] = useState(10);

  useEffect(() => {
    cargarInternosNombresBloque6();
  }, []);

  useEffect(() => {
    const agrupados = internosNombresBloque6.reduce((acc, { DNOMBRE, DPATERNO, DMATERNO, LLAVE, ID_ALTERNA }) => {
      if (!acc[LLAVE]) {
        acc[LLAVE] = { nombres: [], LLAVE, ID_ALTERNA };
      }
      acc[LLAVE].nombres.push({ DNOMBRE, DPATERNO, DMATERNO });
      return acc;
    }, {});
    const resultadosAgrupados = Object.values(agrupados);
    setResultados(resultadosAgrupados);
    setResultadosFiltrados(resultadosAgrupados);
  }, [internosNombresBloque6]);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);
    const filtrados = resultados.filter((registro) =>
      registro.nombres
        .map((n) => [n.DNOMBRE, n.DPATERNO, n.DMATERNO].join(" ").toLowerCase())
        .some((nombre) => nombre.includes(valor))
    );
    setResultadosFiltrados(filtrados);
    setPaginaActual(1);
  };

  const handleSeleccionar = (LLAVE, ID_ALTERNA) => {
    dispatch(setLlave(LLAVE));
    dispatch(setIdAlterna(ID_ALTERNA));
    navigate(`/admin2/verificar6_2`);
  };

  const indiceFinal = paginaActual * resultadosPorPagina;
  const indiceInicial = indiceFinal - resultadosPorPagina;
  const resultadosPaginados = resultadosFiltrados.slice(indiceInicial, indiceFinal);

  const handleSiguiente = () => {
    if (paginaActual < Math.ceil(resultadosFiltrados.length / resultadosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <motion.div
      className="container-fluid mt-4 position-relative overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(to bottom right, #0A0A0A, #111827)",
        color: "#E5E7EB",
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 0 25px rgba(16, 185, 129, 0.25)",
        minHeight: "85vh",
      }}
    >
      {/* Fondo animado tipo burbuja verde */}
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(16, 185, 129, 0.15)",
          top: "-120px",
          left: "-120px",
          zIndex: 0,
          filter: "blur(120px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Contenido principal */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="fw-bold mb-2 text-white">📂 Registros del Bloque 6</h2>
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
            border: "1px solid #10B981",
            padding: "12px",
          }}
        />

        <motion.table
          className="table table-dark table-hover align-middle w-100 border border-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead style={{ backgroundColor: "#0F172A", color: "#10B981" }}>
            <tr className="text-uppercase text-center">
              <th>Nombre(s)</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {resultadosPaginados.map(({ nombres, LLAVE, ID_ALTERNA }) => (
              <tr key={ID_ALTERNA}>
                <td>
                  {nombres.map((n, i) => (
                    <div key={i} className="py-1">{n.DNOMBRE} {n.DPATERNO} {n.DMATERNO}</div>
                  ))}
                </td>
                <td className="text-center">
                  <motion.button
                    className="btn btn-outline-success btn-sm d-flex align-items-center gap-2 justify-content-center"
                    style={{ minWidth: "120px" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSeleccionar(LLAVE, ID_ALTERNA)}
                  >
                    <FaSearch /> Ver
                  </motion.button>
                </td>
              </tr>
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
      </div>
    </motion.div>
  );
};

export default Bloque6_2;