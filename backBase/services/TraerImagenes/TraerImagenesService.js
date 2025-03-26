const TraerImagenesModel = require('../../models/TraerImagenes/TraerImagenesModel');

const TraerImagenesService = {
  async obtenerImagenesPorLlave(llave) {
    return await TraerImagenesModel.obtenerImagenesPorLlave(llave);
  }
};

module.exports = TraerImagenesService;
