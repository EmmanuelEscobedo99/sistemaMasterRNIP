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

  async obtenerInternosProcesado8(req, res) { // ✅ Cambio aquí
    try {
      const result = await buscarInternosService.obtenerInternos(8); // ✅ Cambio aquí
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = buscarInternosController;
``
