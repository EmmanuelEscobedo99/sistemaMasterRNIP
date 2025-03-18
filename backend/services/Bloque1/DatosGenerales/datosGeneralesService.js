const DatosGeneralesModel = require( '../../../models/Bloque1/DatosGenerales/datosGeneralesModel' );

const datosGeneralesService = {
  async obtenerIdAlterna ( LLAVE ) {
    try {
      const result = await DatosGeneralesModel.obtenerIdAlterna( LLAVE );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = datosGeneralesService;