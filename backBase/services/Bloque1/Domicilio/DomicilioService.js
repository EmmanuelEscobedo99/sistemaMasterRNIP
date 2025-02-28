const DomicilioModel = require( '../../../models/Bloque1/Domicilio/DomicilioModel' );

const DomicilioService = {
  async obtenerDomicilio ( idAlterna ) {
    try {
      const result = await DomicilioModel.obtenerDomicilio( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = DomicilioService;