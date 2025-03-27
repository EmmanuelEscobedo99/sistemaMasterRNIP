import React, { useEffect, useState } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIdAlterna } from "../../../sistemaAdmin/reducers/slice/idAlterna/idAlternaSlice";
import { setLlave } from "../../../sistemaAdmin/reducers/slice/Llave/LlaveSlice";
import { motion } from "framer-motion";
import { FaUserCheck } from "react-icons/fa";

const Bloque1y2_2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const { internosBloque1y2, cargarInternosBloque1y2 } = useStore();
  const [resultados, setResultados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina] = useState(10);

  useEffect(() => {
    cargarInternosBloque1y2();
  }, []);

  useEffect(() => {
    setResultados(internosBloque1y2);
  }, [internosBloque1y2]);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = internosBloque1y2.filter((registro) =>
      registro.nombres.some((n) =>
        [n.DNOMBRE, n.DPATERNO, n.DMATERNO].join(" ").toLowerCase().includes(valor)
      )
    );

    setResultados(filtrados);
    setPaginaActual(1);
  };

  const handleSeleccionar = (idAlterna, llave) => {
    dispatch(setIdAlterna(idAlterna));
    dispatch(setLlave(llave));
    navigate(`/admin2/verificar2`);
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
    <motion.div
      className="container-fluid mt-4"
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
      <h2 className="fw-bold mb-2 text-white">📋 Registros del Bloque 1 y 2</h2>
      <p className="text-secondary mb-4">
        Aquí se muestran los registros correspondientes al Bloque 1 y 2.
      </p>

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
          {resultadosPaginados.map(({ ID_ALTERNA, LLAVE, nombres }) => (
            <tr key={ID_ALTERNA}>
              <td>
                {nombres.map((n, i) => (
                  <div key={i} className="py-1">
                    {n.DNOMBRE} {n.DPATERNO} {n.DMATERNO}
                  </div>
                ))}
              </td>
              <td className="text-center">
                <motion.button
                  className="btn btn-outline-success btn-sm d-flex align-items-center gap-2 justify-content-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSeleccionar(ID_ALTERNA, LLAVE)}
                  style={{ minWidth: "140px" }}
                >
                  <FaUserCheck /> Seleccionar
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
          disabled={paginaActual === Math.ceil(resultados.length / resultadosPorPagina)}
        >
          Siguiente ▶
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Bloque1y2_2;
