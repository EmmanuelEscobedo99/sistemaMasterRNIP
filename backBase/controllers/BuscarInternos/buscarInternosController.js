const buscarInternosService = require('../../services/buscarInternos/buscarInternosService');

const buscarInternosController = {
  async obtenerInternosProcesado6(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(6); // PROCESADO = 6
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerInternosProcesado7(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(7); // PROCESADO = 7
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = buscarInternosController;
