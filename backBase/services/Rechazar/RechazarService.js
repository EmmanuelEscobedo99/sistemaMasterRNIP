const RechazarModel = require( '../../models/Rechazar/RechazarModel' );

const RechazarService = {
  async rechazarRegistro ( idAlterna ) {
    try {
      const result = await RechazarModel.rechazarRegistro( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = RechazarService;