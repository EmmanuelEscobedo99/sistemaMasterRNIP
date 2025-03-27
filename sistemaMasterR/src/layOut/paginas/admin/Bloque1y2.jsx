import React, { useEffect, useState } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIdAlterna } from "../../../sistemaAdmin/reducers/slice/IdAlterna/IdAlternaSlice";
import { setLlave } from "../../../sistemaAdmin/reducers/slice/Llave/LlaveSlice";
import { motion } from "framer-motion";

const Bloque1y2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const { internosBloque1y2D, cargarInternosBloque1y2D } = useStore();
  const [resultados, setResultados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina] = useState(10);

  useEffect(() => {
    cargarInternosBloque1y2D();
  }, []);

  useEffect(() => {
    setResultados(internosBloque1y2D);
  }, [internosBloque1y2D]);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = internosBloque1y2D.filter((registro) =>
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
    navigate(`/admin/verificar`);
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
        color: "#E5E7EB",
        backgroundColor: "#0A0A0A",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <h2 className="fw-bold mb-1">Registros del Bloque 1 y 2</h2>
      <p className="text-secondary mb-4">
        Aquí se muestran los registros correspondientes al Bloque 1 y 2D.
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
            {resultadosPaginados.map(({ ID_ALTERNA, LLAVE, nombres }) => (
              <tr key={ID_ALTERNA}>
                <td className="px-3">
                  {nombres.map((n, i) => (
                    <div key={i} className="py-1">
                      {n.DNOMBRE} {n.DPATERNO} {n.DMATERNO}
                    </div>
                  ))}
                </td>
                <td className="text-center px-3">
                  <motion.button
                    className="btn btn-primary btn-sm px-4"
                    style={{ backgroundColor: "#2563EB", border: "none" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSeleccionar(ID_ALTERNA, LLAVE)}
                  >
                    Seleccionar
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
          disabled={paginaActual === Math.ceil(resultados.length / resultadosPorPagina)}
        >
          Siguiente ▶
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Bloque1y2;
