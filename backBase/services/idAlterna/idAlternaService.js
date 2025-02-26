const idAlternaModel = require( '../../models/idAlterna/idAlternaModel' );

const idAlternaService = {
  async obtenerIdAlterna ( LLAVE ) {
    try {
      const result = await idAlternaModel.obtenerIdAlterna( LLAVE );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = idAlternaService;