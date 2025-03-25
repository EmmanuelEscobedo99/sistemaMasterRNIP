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

  async obtenerInternosProcesado2() {
    try {
      const result = await buscarInternosModel.obtenerInternosProcesado2();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async obtenerNombresPorBloques6() {
    try {
      const result = await buscarInternosModel.obtenerNombresPorBloques6();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async obtenerNombresPorBloques6D() {
    try {
      const result = await buscarInternosModel.obtenerNombresPorBloques6D();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = buscarInternosService;
