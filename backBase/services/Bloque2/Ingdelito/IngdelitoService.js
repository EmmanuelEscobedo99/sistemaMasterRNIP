const IngdelitoModel = require( '../../../models/Bloque2/Ingdelito/IngdelitoModel' );

const IngdelitoService = {
  async obtenerIngdelito ( idAlterna ) {
    try {
      const result = await IngdelitoModel.obtenerIngdelito( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = IngdelitoService;