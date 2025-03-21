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
   // Nueva función que obtiene los nombres con la ID_ALTERNA basada en los bloques funcionales
   async obtenerNombresPorBloques6() {
    try {
      const result = await buscarInternosModel.obtenerNombresPorBloques6();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = buscarInternosService;
