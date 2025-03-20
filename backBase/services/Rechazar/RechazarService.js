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
  async rechazarRegistro2 ( newIdAlterna ) {
    try {
      const result = await RechazarModel.rechazarRegistro2( newIdAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = RechazarService;