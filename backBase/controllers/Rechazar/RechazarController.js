const RechazarService = require( '../../services/Rechazar/RechazarService' );

const RechazarController = {
  async rechazarRegistro( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await RechazarService.rechazarRegistro( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = RechazarController;