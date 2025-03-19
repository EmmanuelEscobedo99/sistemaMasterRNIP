const obtenerIdAlternaModel = require( '../../../models/Bloque1/obtenerIdAlterna/obtenerIdAlternaModel' );

const obtenerIdAlternaService = {
  async obtenerIdAlterna ( LLAVE ) {
    try {
      const result = await obtenerIdAlternaModel.obtenerIdAlterna( LLAVE );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = obtenerIdAlternaService;