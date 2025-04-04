const RechazadosMexicoService = require('../../services/Rechazadosmexico/RechazadosmexicoService');

const RechazadosMexicoController = {
  async obtenerRechazadosMexico(req, res) {
    try {
      const rechazados = await RechazadosMexicoService.obtenerRechazadosMexico();
      res.status(200).json(rechazados);
    } catch (error) {
      console.error("Error al obtener rechazados por México:", error);
      res.status(500).json({ error: 'Error al obtener rechazados por México' });
    }
  }
};

module.exports = RechazadosMexicoController;
