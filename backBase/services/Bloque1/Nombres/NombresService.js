const NombresModel = require( '../../../models/Bloque1/Nombres/NombresModel' );

const NombresService = {
  async obtenerNombres ( idAlterna ) {
    try {
      const result = await NombresModel.obtenerNombres( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = NombresService;