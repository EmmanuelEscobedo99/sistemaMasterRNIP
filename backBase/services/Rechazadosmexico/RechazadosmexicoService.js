const RechazadosMexicoModel = require('../../models/Rechazadosmexico/RechazadosmexicoModel');

const RechazadosMexicoService = {
  async obtenerRechazadosMexico() {
    try {
      const registros = await RechazadosMexicoModel.obtenerRechazadosMexico();
      return registros;
    } catch (error) {
      console.error('Error en el servicio de rechazados por México:', error);
      throw error;
    }
  }
};

module.exports = RechazadosMexicoService;
