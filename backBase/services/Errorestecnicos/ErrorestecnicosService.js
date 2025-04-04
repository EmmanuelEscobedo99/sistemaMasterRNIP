const ErroresTecnicosModel = require('../../models/Errorestecnicos/ErrorestecnicosModel');

const ErroresTecnicosService = {
  async obtenerErroresTecnicos() {
    try {
      const errores = await ErroresTecnicosModel.obtenerErroresTecnicos();
      return errores;
    } catch (error) {
      console.error('Error en el servicio de errores técnicos:', error);
      throw error;
    }
  }
};

module.exports = ErroresTecnicosService;
