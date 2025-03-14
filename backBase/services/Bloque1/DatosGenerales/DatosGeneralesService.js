const DatosGeneralesModel = require( '../../../models/Bloque1/DatosGenerales/DatosGeneralesModel' );

const datosGeneralesService = {
  async obtenerDatosGenerales ( idAlterna ) {
    try {
      const result = await DatosGeneralesModel.obtenerDatosGenerales( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = datosGeneralesService;