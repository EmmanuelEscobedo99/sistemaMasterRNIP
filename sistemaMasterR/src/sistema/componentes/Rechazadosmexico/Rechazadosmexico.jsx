// src/sistema/componentes/Rechazadosmexico/Rechazadosmexico.jsx

import React, { useEffect, useState } from "react";
import useStore from "../../../app/useStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const Rechazadosmexico = () => {
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
        await useStore.getState().cargarInternosRechazadosMexico();
        const data = useStore.getState().internosRechazadosMexico;

        await useStore.getState().cargarErroresB6();
        const descripcion = useStore.getState().erroresB6;

        const agrupados = data.reduce((acc, { DNOMBRE, DPATERNO, DMATERNO, LLAVE, ID_ALTERNA }) => {
          if (!acc[LLAVE]) {
            acc[LLAVE] = { nombres: [], LLAVE, ID_ALTERNA, descripcion: "" };
          }
          acc[LLAVE].nombres.push({ DNOMBRE, DPATERNO, DMATERNO });

          const descObject = descripcion.find(d => d.LLAVE === LLAVE);
          const descripcionLLAVE = descObject ? descObject.descripcion : "Descripción no disponible";
          acc[LLAVE].descripcion = descripcionLLAVE;

          return acc;
        }, {});

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
          <h2 className="fw-bold mb-1">Rechazados por México</h2>
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
                  <th className="text-center px-3">Motivo de rechazo</th>
                  <th className="text-center px-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {resultadosPaginados.length > 0 ? (
                  resultadosPaginados.map(({ nombres, LLAVE, descripcion }, idx) => (
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
                      <td style={{ color: 'red' }}>{descripcion}</td>
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

export default Rechazadosmexico;
