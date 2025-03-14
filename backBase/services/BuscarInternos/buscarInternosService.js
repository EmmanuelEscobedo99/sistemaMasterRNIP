const buscarInternosModel = require('../../models/BuscarInternos/buscarInternosModel');

const buscarInternosService = {
  async obtenerInternos(procesado) {
    try {
      const result = await buscarInternosModel.obtenerInternos(procesado);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = buscarInternosService;
