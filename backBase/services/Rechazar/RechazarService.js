const RechazarModel = require( '../../models/Rechazar/RechazarModel' );

const RechazarService = {
  async rechazarRegistro( ID_ALTERNA, LLAVE, FORMULARIO, CAMPO, DESCRIPCION  ) {
    try {
      return await RechazarModel.rechazarRegistro( ID_ALTERNA, LLAVE, FORMULARIO, CAMPO, DESCRIPCION );
    } catch ( error ) {
      console.error( error );
      throw error;
    }
  },
  async rechazarRegistro2( LLAVE, FORMULARIO, CAMPO, DESCRIPCION ) {
    try {
      const result = await RechazarModel.rechazarRegistro2( LLAVE, FORMULARIO, CAMPO, DESCRIPCION );
      return result;
    } catch ( error ) {
      console.error( error );
      throw error;
    }
  },

};

module.exports = RechazarService; // ✅ Asegurar que se exporta correctamente
