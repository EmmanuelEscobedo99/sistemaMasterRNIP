const SituacionModel = require( '../../../models/Bloque2/Situacion/SituacionModel' );

const SituacionService = {
  async obtenerSituacion ( idAlterna ) {
    console.log("service", idAlterna)
    try {
      const result = await SituacionModel.obtenerSituacion( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = SituacionService;