import React, { useEffect, useState } from "react";
import useStore from "../../../sistemaAdmin/zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLlave } from "../../../sistemaAdmin/reducers/slice/Llave/LlaveSlice";
import { motion } from "framer-motion";

const Bloque6 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  // ⬇️ Cambiamos a la nueva función de Zustand
  const { internosNombresBloque6D, cargarInternosNombresBloque6D } = useStore();
  const [resultados, setResultados] = useState([]);

  // 📌 Cargar datos al montar el componente
  useEffect(() => {
    cargarInternosNombresBloque6D();
  }, []);

  // 📌 Asegurar que resultados es un array antes de mapear
  useEffect(() => {
    // Agrupar los registros por LLAVE
    const agrupados = internosNombresBloque6D.reduce((acc, { DNOMBRE, DPATERNO, DMATERNO, LLAVE, ID_ALTERNA }) => {
      // Si no existe la llave en el acumulador, la inicializamos
      if (!acc[LLAVE]) {
        acc[LLAVE] = { nombres: [], LLAVE, ID_ALTERNA };
      }
      // Agregar el nombre completo al grupo de la misma LLAVE
      acc[LLAVE].nombres.push({ DNOMBRE, DPATERNO, DMATERNO });
      return acc;
    }, {});

    // Convertir el objeto de agrupados en un array para que lo podamos usar en el estado
    const resultadosAgrupados = Object.values(agrupados);
    setResultados(resultadosAgrupados);
  }, [internosNombresBloque6D]);

  // 🔎 Buscar en la tabla
  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    // Filtrar los resultados según la búsqueda, revisando en los nombres concatenados
    const filtrados = resultados.filter((registro) =>
      registro.nombres
        .map((n) => [n.DNOMBRE, n.DPATERNO, n.DMATERNO].join(" ").toLowerCase())
        .some((nombre) => nombre.includes(valor))
    );

    setResultados(filtrados);
  };

  // 🔹 Seleccionar y redirigir
  const handleSeleccionar = (LLAVE) => {
    dispatch(setLlave(LLAVE));
    navigate(`/admin/verificar6`);
  };

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ color: "#E5E7EB", backgroundColor: "#0A0A0A", padding: "20px", borderRadius: "10px" }}
    >
      <h2 className="fw-bold" style={{ color: "#E5E7EB" }}>
        Registros del Bloque 6D
      </h2>
      <p style={{ color: "#D1D5DB" }}>
        Aquí se muestran los registros correspondientes al Bloque 6D.
      </p>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Escribe un nombre..."
        value={busqueda}
        onChange={handleBuscar}
        style={{ backgroundColor: "#1F2937", color: "white", border: "1px solid #374151" }}
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
          {resultados.map(({ nombres, LLAVE, ID_ALTERNA }) => (
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
                  onClick={() => handleSeleccionar(LLAVE)}
                >
                  Seleccionar
                </motion.button>
              </td>
            </tr>
          ))}
          {resultados.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center text-danger">
                No se encontraron registros
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default Bloque6;
