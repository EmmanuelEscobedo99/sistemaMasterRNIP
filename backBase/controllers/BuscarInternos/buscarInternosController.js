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

  async obtenerInternosProcesado9(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(9);
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
  async obtenerInternosProcesado10(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(10);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = buscarInternosController;
