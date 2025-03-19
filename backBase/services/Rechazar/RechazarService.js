const RechazarModel = require('../../models/Rechazar/RechazarModel');

const RechazarService = {
  async rechazarRegistro(idAlterna) {
    try {
      return await RechazarModel.rechazarRegistro(idAlterna);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = RechazarService; // ✅ Asegurar que se exporta correctamente
