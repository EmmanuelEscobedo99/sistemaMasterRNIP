const ErroresTecnicosService = require('../../services/Errorestecnicos/ErrorestecnicosService');

const ErroresTecnicosController = {
  async obtenerErroresTecnicos(req, res) {
    try {
      const errores = await ErroresTecnicosService.obtenerErroresTecnicos();
      res.status(200).json(errores);
    } catch (error) {
      console.error("Error al obtener errores técnicos:", error);
      res.status(500).json({ error: 'Error al obtener errores técnicos' });
    }
  }
};

module.exports = ErroresTecnicosController;
