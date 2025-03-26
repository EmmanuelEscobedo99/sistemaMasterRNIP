import React, { useEffect, useState } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIdAlterna } from "../../../sistemaAdmin/reducers/slice/idAlterna/idAlternaSlice";
import { setLlave } from "../../../sistemaAdmin/reducers/slice/Llave/LlaveSlice"; // ✅ Importar LLAVE
import { motion } from "framer-motion";

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
        [n.DNOMBRE, n.DPATERNO, n.DMATERNO]
          .join(" ")
          .toLowerCase()
          .includes(valor)
      )
    );

    setResultados(filtrados);
  };

  const handleSeleccionar = (idAlterna, llave) => {
    console.log("Seleccionado → ID_ALTERNA:", idAlterna, "LLAVE:", llave); // ✅ Log de prueba
    dispatch(setIdAlterna(idAlterna));
    dispatch(setLlave(llave)); // ✅ Guardar la LLAVE en Redux
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
      className="container mt-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        color: "#E5E7EB",
        backgroundColor: "#0A0A0A",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 className="fw-bold" style={{ color: "#E5E7EB" }}>
        Registros del Bloque 1 y 2
      </h2>
      <p style={{ color: "#D1D5DB" }}>
        Aquí se muestran los registros correspondientes al Bloque 1 y 2.
      </p>

      <input
        type="text"
        className="form-control my-3"
        placeholder="🔍 Escribe un nombre..."
        value={busqueda}
        onChange={handleBuscar}
        style={{
          backgroundColor: "#1F2937",
          color: "#E5E7EB",
          border: "1px solid #374151",
        }}
      />

      <motion.table
        className="table table-dark table-bordered"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="table-dark">
          <tr>
            <th>Nombre(s)</th>
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {resultadosPaginados.map(({ ID_ALTERNA, LLAVE, nombres }) => (
            <tr key={ID_ALTERNA}>
              <td>
                {nombres.map((n, i) => (
                  <div key={i}>
                    {n.DNOMBRE} {n.DPATERNO} {n.DMATERNO}
                  </div>
                ))}
              </td>
              <td className="text-center">
                <motion.button
                  className="btn btn-primary btn-sm px-3"
                  style={{ backgroundColor: "#2563EB", border: "none" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSeleccionar(ID_ALTERNA, LLAVE)} // ✅ Ahora con LLAVE
                >
                  Seleccionar
                </motion.button>
              </td>
            </tr>
          ))}
          {resultadosPaginados.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center text-danger">
                No se encontraron registros
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleAnterior}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleSiguiente}
          disabled={paginaActual === Math.ceil(resultados.length / resultadosPorPagina)}
        >
          Siguiente
        </button>
      </div>
    </motion.div>
  );
};

export default Bloque1y2_2;
