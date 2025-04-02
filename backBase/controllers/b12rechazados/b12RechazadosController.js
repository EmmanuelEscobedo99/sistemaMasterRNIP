const { getInternosB12Rechazados } = require("../../services/b12rechazados/b12RechazadosService");

const obtenerB12Rechazados = async (req, res) => {
  try {
    const data = await getInternosB12Rechazados();
    res.json(data);
  } catch (error) {
    console.error("Error en el controlador B12 Rechazados:", error);
    res.status(500).json({ message: "Error al obtener los internos B12 rechazados" });
  }
};

module.exports = {
  obtenerB12Rechazados,
};
