const buscarInternosService = require('../../services/buscarInternos/buscarInternosService');

const buscarInternosController = {
  async obtenerInternosProcesado6(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(6);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerInternosProcesado8(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(8);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // 🔹 Agregado: Procesado 7 (Bloque 1y2D)
  async obtenerInternosProcesado7(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(7);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // 🔹 Agregado: Procesado 10 (Bloque 6D)
  async obtenerInternosProcesado11(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(11);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = buscarInternosController;
