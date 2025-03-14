EjecucionModel = require( '../../../models/Bloque2/Ejecucion/EjecucionModel' );

const EjecucionService = {
  async obtenerEjecucion ( idAlterna ) {
    console.log("service", idAlterna)
    try {
      const result = await EjecucionModel.obtenerEjecucion( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = EjecucionService;