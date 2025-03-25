const RechazarModel = require('../../models/Rechazar/RechazarModel');

const RechazarService = {
  async rechazarRegistro(ID_ALTERNA, FORMULARIO, CAMPO, DESCRIPCION) {
    return await RechazarModel.rechazarRegistro(ID_ALTERNA, FORMULARIO, CAMPO, DESCRIPCION);
  },

  async rechazarRegistro2(LLAVE, FORMULARIO, CAMPO, DESCRIPCION) {
    return await RechazarModel.rechazarRegistro2(LLAVE, FORMULARIO, CAMPO, DESCRIPCION);
  },

  async obtenerLlaveDesdeIdAlterna(idAlterna) {
    return await RechazarModel.obtenerLlaveDesdeIdAlterna(idAlterna);
  }
};

module.exports = RechazarService;
