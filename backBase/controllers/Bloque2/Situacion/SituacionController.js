const SituacionService = require( '../../../services/Bloque2/Situacion/SituacionService' );

const SituacionController = {
  async obtenerSituacion( req, res ) {
    try {
      const { idAlterna } = req.params;
      console.log("controller", idAlterna)
      const result = await SituacionService.obtenerSituacion( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = SituacionController;