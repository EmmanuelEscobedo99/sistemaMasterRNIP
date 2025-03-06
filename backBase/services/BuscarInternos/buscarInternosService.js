const buscarInternosModel = require( '../../models/BuscarInternos/buscarInternosModel' );

const buscarInternosService = {
  async obtenerInternos() {
    try {
      const result = await buscarInternosModel.obtenerInternos();
      return result;
    } catch ( error ) {
      console.error( error );
      throw error;
    }
  },
};

module.exports = buscarInternosService;